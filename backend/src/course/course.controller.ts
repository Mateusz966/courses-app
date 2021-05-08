import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserObj } from 'decorators/user-obj.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CourseService } from './course.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storDir } from 'utils/storDir';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
const path = require('path');



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
  async add(@UserObj() user, @Body() categoriesDetails: CreateCourseDto) {
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
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update/:courseId')
  @UseInterceptors(FileInterceptor('courseFn', {
    dest: path.join(storDir() + '/course_photo'),
  }))
  async update(
    @Param('courseId') courseId: string,
    @Body() payload: UpdateCourseDto,
    @UploadedFile() courseFn: Express.Multer.File,
  ) {
    try {
      return await this.courseService.update(payload, courseId, courseFn);
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

  @UseGuards(JwtAuthGuard)
  @Post('/main-photo/:courseId')
  @UseInterceptors(FileInterceptor('courseFn'))
  async setMainPhoto(
    @UploadedFile() courseFn: Express.Multer.File
  ) {
    console.log(courseFn)
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-video-lesson/:courseId/:lessonId')
  @UseInterceptors(FileInterceptor('video'))
  async uploadLessonVideo(
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
    @UploadedFile() video: Express.Multer.File,
    @Res() res,
    @UserObj() user,
  ) {
    try {
      this.courseService.uploadLessonVideo(
        user,
        video,
        courseId,
        lessonId,
        res,
      )
    } catch (error) {

    }
  }


}
