import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CourseStatus, CreateCourse } from 'app-types/category';
import { Category } from 'src/category/entities/category.entity';
import { Topic } from 'src/category/entities/topic.entity';
import { setFileIfExists } from 'utils/setFileIfExist';
import { User } from '../user/entity/user.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseTopics } from './entities/course-topics.entity';
import { Course } from './entities/course.entity';
import * as path from 'path';
import { Lesson } from './entities/lesson.entity';
const Vimeo = require('vimeo').Vimeo;

@Injectable()
export class CourseService {
  async myAll(userId: string) {
    try {
      return await Course.find({ where: { userId } });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async add(user: User, categoriesDetails: CreateCourse) {
    try {
      const course = new Course();

      course.user = user;
      course.title = 'No title';
      course.description = '';
      //@ts-ignore
      course.category = categoriesDetails.category.value;
      //@ts-ignore
      course.subcategory = categoriesDetails.subcategory.value as Category;

      const addedCourse = await course.save();

      await this.handleCourseTopics(addedCourse, categoriesDetails);

      return addedCourse.id;
    } catch (error) {
      throw error;
    }
  }

  async getCourseDetails(id: string) {

    try {

      const course = await Course
        .createQueryBuilder("course")
        .select("course")
        .leftJoinAndSelect("course.category", "category")
        .leftJoinAndSelect("course.subcategory", "subcategory")
        .where("course.id = :id", { id, })
        .getOne();


      const topics = await CourseTopics
        .createQueryBuilder("topics")
        .leftJoinAndSelect("topics.topic", "topic")
        .where("topics.course = :id", { id: course.id })
        .getMany();


      return {
        ...course,
        ...topics
      };

    } catch (error) {
      throw error;
    }
  }

  async update(newCourse: UpdateCourseDto, courseId: string, courseFn: Express.Multer.File) {
    try {
      const course = await Course.findOrThrow({ where: { id: courseId } });

      course.description = newCourse.description;
      course.title = newCourse.title;
      course.content = newCourse.content;
      await course.save();

      if (courseFn) {
        await setFileIfExists(course, 'courseFn', 'course_photo', courseFn, true, 512);
      }

      return course;

    } catch (error) {
      throw error;
    }
  }

  async updateCategory(courseId: string, categoriesDetails: CreateCourse) {
    try {
      const course = await Course.findOrThrow({ where: { id: courseId } });
      await this.handleCourseTopics(course, categoriesDetails);
    } catch (error) {
      throw error;
    }
  }

  async publish(courseId: string) {
    const course = await Course.findOrThrow({ where: { id: courseId } });
    course.courseStatus = CourseStatus.Published;
    return await course.save();
  }

  async delete(courseId: string) {
    const course = await Course.findOrThrow({ where: { id: courseId } });
    course.courseStatus = CourseStatus.Removed;
    return await course.save();
  }

  async handleCourseTopics(
    addedCourse: Course,
    categoriesDetails: CreateCourse,
  ) {
    const courseTopics: CourseTopics[] = [];
    const courseTopicsToSave: CourseTopics[] = [];

    categoriesDetails.topics.forEach((topic, index) => {
      courseTopics[index] = new CourseTopics();
      courseTopics[index].course = addedCourse;
      courseTopics[index].topic = topic.value as Topic;
      courseTopicsToSave.push(courseTopics[index]);
    });

    return await CourseTopics.save(courseTopicsToSave);
  }


  async uploadLessonVideo(
    user: User,
    file: Express.Multer.File,
    courseId: string,
    lessonId: string,
    res: Response
  ) {
    try {
      const client = new Vimeo(process.env.VIMEO_CLIENT_ID, process.env.VIMEO_CLIENT_SECRET, process.env.VIMEO_ACCESS_TOKEN)
      const lesson = await Lesson.findOrThrow({ where: { id: lessonId } })
      const newFileName = file.filename + path.parse(file.originalname).ext;
      const nameWithoutExt = file.originalname.replace(/\.[^/.]+$/, '');
    } catch (error) {
      throw error;
    }
  }

}
