import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/entity/user.entity';
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

  async add(user: User) {
    try {
      const course = new Course();
      course.user = user;
      course.title = 'No title';
      course.description = '';
      const addedCourse =  await course.save();
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
