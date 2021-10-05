import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import {
  CourseStatus,
  CreateCourse,
  ApiErrorCode,
  CourseDetailsRes,
  CourseSectionsRes,
  ILesson,
} from '../../app-types';
import { setFileIfExists } from '../../utils/setFileIfExist';
import { VimeoService } from '../vimeo/vimeo.service';
import { CategoryService } from '../category/category.service';
import { Topic } from '../category/entities/topic.entity';
import { User } from '../user/entity/user.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseTopics } from './entities/course-topics.entity';
import { Course } from './entities/course.entity';
import { Lesson } from './entities/lesson.entity';
import { Section } from './entities/section.entity';
import { storDir } from '../../utils/storDir';
import { CourseContentDto } from './dto/course-content';

const path = require('path');

@Injectable()
export class CourseService {
  constructor(
    private readonly vimeoService: VimeoService,
    private readonly categoryService: CategoryService,
  ) {}

  async myCreated(userId: string, offset: number, limit?: number) {
    const [items, countTotal] = await Course.createQueryBuilder('course')
      .select(['course.title', 'course.courseStatus', 'course.id'])
      .where('course.user = :id', { id: userId })
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    return { items, countTotal };
  }

  async published(
    userId: string,
    offset: number,
    filterBy: {
      categories?: string;
      subcategories?: string;
    },
    limit?: number,
  ) {
    const [items, countTotal] = await Course.published(
      userId,
      offset,
      filterBy,
      limit,
    );

    return { items, countTotal };
  }

  async handleCourseTopics(addedCourse: Course, topics: Topic[]) {
    const courseTopics: CourseTopics[] = [];
    const courseTopicsToSave: CourseTopics[] = [];

    await Promise.all(
      topics.map(async (topic, index) => {
        courseTopics[index] = new CourseTopics();
        courseTopics[index].course = addedCourse;
        courseTopics[index].topic = topic;
        courseTopicsToSave.push(courseTopics[index]);
      }),
    );

    return CourseTopics.save(courseTopicsToSave);
  }

  async add(user: User, categoriesDetails: CreateCourse) {
    const {
      category,
      subcategory,
      topics,
    } = await this.categoryService.areCategoriesExist(categoriesDetails);
    const course = new Course();

    course.user = user;
    course.category = category;
    course.subcategory = subcategory;

    const addedCourse = await course.save();

    await this.handleCourseTopics(addedCourse, topics);

    return addedCourse.id;
  }

  async getCourseDetails(id: string): Promise<CourseDetailsRes> {
    const course = await Course.getCourseDetailsById(id);
    const topics = await CourseTopics.getCourseTopics(id);

    return {
      ...course,
      topics,
    };
  }

  async update(
    newCourse: UpdateCourseDto,
    courseId: string,
    courseFn: Express.Multer.File,
  ) {
    const course = await Course.findOrThrow({ where: { id: courseId } });

    course.description = newCourse.description;
    course.title = newCourse.title;
    course.content = newCourse.content;

    await course.save();

    if (courseFn) {
      await setFileIfExists(
        course,
        'courseFn',
        'course_photo',
        courseFn,
        true,
        512,
      );
    }
  }

  async updateCategory(courseId: string, categoriesDetails: CreateCourse) {
    const course = await Course.findOrThrow({ where: { id: courseId } });
    const { topics } = await this.categoryService.areCategoriesExist(
      categoriesDetails,
    );
    await this.handleCourseTopics(course, topics);
  }

  async publish(courseId: string) {
    const course = await Course.findOrThrow({ where: { id: courseId } });
    course.courseStatus = CourseStatus.Published;
    return course.save();
  }

  async delete(userId: string, courseId: string) {
    const course = await Course.getWithUser(userId, courseId);
    if (course.user.id === userId) {
      course.courseStatus = CourseStatus.Removed;
      return Course.update(course.id, course);
    } else {
      throw new HttpException(
        {
          errorCode: ApiErrorCode.WrongCourseId,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async uploadVideoForLesson(
    lesson: Omit<ILesson, 'videoFn'>[],
    savedSection: Section,
    videos: Express.Multer.File[],
  ) {
    return Promise.all(
      lesson.map(async (payload) => {
        const lesson = new Lesson();
        const video = videos.find(
          (file) => file.fieldname === `video_${payload.id}`,
        );
        lesson.id = payload.id;
        lesson.description = payload.description;
        lesson.section = savedSection;
        lesson.title = payload.title;
        lesson.videoFn = await this.vimeoService.upload(
          video,
          video.filename,
          'opis',
        );
        return lesson.save();
      }),
    );
  }

  async uploadLessonVideo(
    user: User,
    files: Express.Multer.File[],
    courseId: string,
    data: CourseContentDto,
  ) {
    const course = await Course.findOne({ where: { id: courseId } });
    const section = new Section();

    section.description = data.sectionDescription;
    section.title = data.sectionName;
    section.course = course;

    const savedSection = await section.save();

    return this.uploadVideoForLesson(data.lesson, savedSection, files);
  }

  async getCoursePhoto(courseId: string, res: Response) {
    const course = await Course.findOrThrow({ where: { id: courseId } });
    try {
      if (!course?.courseFn) {
        res.status(HttpStatus.OK).json(null);
      } else {
        res.sendFile(
          path.join(`${storDir()}/course_photo/${course?.courseFn}`),
        );
      }
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST);
    }
  }

  async getCourseSections(courseId: string): Promise<CourseSectionsRes[]> {
    await Course.findOrThrow({ where: { id: courseId } });
    return Section.find({ where: { course: courseId } });
  }

  async getSectionLessons(sectionId: string) {
    const section = await Section.findOrThrow({ where: { id: sectionId } });
    const lesson = await Lesson.find({ where: { section: sectionId } });
    return {
      section,
      lesson,
    };
  }
}
