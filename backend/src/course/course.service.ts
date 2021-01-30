import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { Course } from './course.entity';

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
      return await course.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(newCourse: any, courseId: string) {
    const course = await Course.findOne({ where: { id: courseId } });
    course.description = newCourse?.description;
    return await course.save();
  }

  async publish(courseId: string) {
    const course = await Course.findOne({ where: { id: courseId } });
    course.isDraft = false;
    return await course.save();
  }
}
