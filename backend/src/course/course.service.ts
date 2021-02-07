import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/entity/user.entity';
import { CourseTopics } from './entities/course-topics.entity';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  async myAll(userId: string) {
    try {
      return await Course.find({ where: { userId } });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async add(user: User, categoriesDetials: any) {
    try {
      const course = new Course();

      course.user = user;
      course.title = 'No title';
      course.description = '';
      course.category = categoriesDetials.category;
      course.subcategory = categoriesDetials.subcategory;

      const addedCourse = await course.save();

      const courseTopics: CourseTopics[] = [];
      const courseTopicsToSave: CourseTopics[] = [];

      if (addedCourse) {
        categoriesDetials.topics.forEach((topic, index) => {
          courseTopics[index] = new CourseTopics();
          courseTopics[index].course = addedCourse;
          //@ts-ignore
          courseTopics[index].topic = topic;
          courseTopicsToSave.push(courseTopics[index]);
        });
      }

      await CourseTopics.save(courseTopicsToSave);
      return addedCourse.id;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(newCourse: any, courseId: string) {
    const course = await Course.findOne({ where: { id: courseId } });
    course.description = newCourse.description;
    course.title = newCourse.title;
    course.category = newCourse.category;
  }

  async publish(courseId: string) {
    const course = await Course.findOne({ where: { id: courseId } });
    course.isDraft = false;
    return await course.save();
  }
}
