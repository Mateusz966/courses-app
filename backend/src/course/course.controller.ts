import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateCourse } from '../../app-types/category';
import { UserObj } from 'decorators/user-obj.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @UseGuards(JwtAuthGuard)
  @Get('/my-all')
  async all(@UserObj() user) {
    try {
      return await this.courseService.myAll(user.id);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async add(@UserObj() user, @Body() categoriesDetails: CreateCourse) {
    try {
      return await this.courseService.add(user, categoriesDetails);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/details/:courseId')
  async getCourseDetails(@Param('courseId') courseId: string) {
    try {
      return await this.courseService.getCourseDetails(courseId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update/:courseId')
  async update(@Param('courseId') courseId: string, @Body() payload: any) {
    try {
      return await this.courseService.update(payload, courseId);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/publish/:courseId')
  async publish(@Param('courseId') courseId: string) {
    try {
      return this.courseService.publish(courseId);
    } catch (error) {
      throw error;
    }
  }

}
