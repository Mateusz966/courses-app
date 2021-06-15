import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryDto, CourseStatus, CreateCourse } from 'app-types/category';
import { CustomSelectOption } from 'app-types/global';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { Topic } from 'src/category/entities/topic.entity';
import { VimeoService } from 'src/vimeo/vimeo.service';
import { setFileIfExists } from 'utils/setFileIfExist';
import { User } from '../user/entity/user.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseTopics } from './entities/course-topics.entity';
import { Course } from './entities/course.entity';
import { Lesson } from './entities/lesson.entity';
import { Section } from './entities/section.entity';

@Injectable()
export class CourseService {
  constructor(
    private readonly vimeoService: VimeoService,
    private readonly categoryService: CategoryService
  ) { }

  async myAll(userId: string) {
    try {
      return await Course.find({ where: { userId } });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async handleCourseTopics(
    addedCourse: Course,
    topics: Topic[],
  ) {
    const courseTopics: CourseTopics[] = [];
    const courseTopicsToSave: CourseTopics[] = [];

    await Promise.all(topics.map(async (topic, index) => {
      courseTopics[index] = new CourseTopics();
      courseTopics[index].course = addedCourse;
      courseTopics[index].topic = topic
      courseTopicsToSave.push(courseTopics[index]);
    }));

    return CourseTopics.save(courseTopicsToSave);
  }

  async add(user: User, categoriesDetails: CreateCourse) {
    try {
      const { category, subcategory, topics } = await this.categoryService.areCategoriesExist(categoriesDetails);
      const course = new Course();

      course.user = user;
      course.title = 'No title';
      course.description = '';
      course.category = category;
      course.subcategory = subcategory;

      const addedCourse = await course.save();

      await this.handleCourseTopics(addedCourse, topics);

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
      const { topics } = await this.categoryService.areCategoriesExist(categoriesDetails);
      await this.handleCourseTopics(course, topics);
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


  async uploadVideoForLesson(lessonId, video) {
    return this.vimeoService.upload(video, video.filename, 'opis');
  }


  async uploadLessonVideo(
    user: User,
    files: Express.Multer.File[],
    courseId: string,
    data: any
  ) {
    try {
      const course = await Course.findOne({ where: { id: courseId } });
      const section = new Section();

      section.description = data.sectionDescription;
      section.title = data.sectionName;
      section.course = course;

      const savedSection = await section.save();

      await Promise.all(data.lesson.map(async (payload) => {
        const lesson = new Lesson();
        lesson.id = payload.id
        lesson.description = payload.description;
        lesson.section = savedSection;
        lesson.title = payload.name;
        lesson.videoFn = await this.uploadVideoForLesson(lesson.id, files.find((file) => file.fieldname === `video_${lesson.id}`));
        await lesson.save();
      }))

    } catch (error) {
      console.log(error)
      throw error;
    }
  }

}
