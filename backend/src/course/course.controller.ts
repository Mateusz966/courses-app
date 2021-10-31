import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserObj } from 'decorators/user-obj.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { storDir } from 'utils/storDir';
import { PaginationParams } from 'src/pagination/pagination-params.dto';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {
  ApiTableRes,
  CourseDetailsRes,
  CourseSectionsRes,
  PublishedCourseRes,
} from '../../app-types';
import { CourseContentDto } from './dto/course-content';
import { FilterParams } from '../pagination/filter-params.dto';
import { BuyCoursesDto } from './dto/buy-courses.dto';

const path = require('path');

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/created/all')
  async myCreated(
    @UserObj() user,
    @Query('search') search: string,
    @Query() { offset, limit }: PaginationParams,
  ) {
    try {
      if (search) {
        // logic with search
      } else {
        return await this.courseService.myCreated(user.id, offset, limit);
      }
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/published')
  async published(
    @UserObj() user,
    @Query('search') search: string,
    @Query() { offset, limit }: PaginationParams,
    @Query() { categories, subcategories }: FilterParams,
  ): Promise<ApiTableRes<PublishedCourseRes[]>> {
    try {
      if (search) {
        // logic with search
      } else {
        return await this.courseService.published(
          user.id,
          offset,
          { categories, subcategories },
          limit,
        );
      }
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/bought')
  async myBought(@UserObj() user, @Query() { offset }: PaginationParams) {
    return this.courseService.myBought(user.id, offset);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async add(@UserObj() user, @Body() categoriesDetails: CreateCourseDto) {
    return this.courseService.add(user, categoriesDetails);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/edit/:courseId')
  async edit(
  @UserObj() user,
    @Body() categoriesDetails: CreateCourseDto,
    @Param('courseId') courseId: string,
  ) {
    return this.courseService.edit(user, categoriesDetails, courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/details/:courseId')
  async getCourseDetails(
    @Param('courseId') courseId: string,
  ): Promise<CourseDetailsRes> {
    return this.courseService.getCourseDetails(courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/sections/:courseId')
  async getCourseSections(
    @Param('courseId') courseId: string,
  ): Promise<CourseSectionsRes[]> {
    return this.courseService.getCourseSections(courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/sections/:sectionId/lessons')
  async getSectionLessons(@Param('sectionId') sectionId: string): Promise<any> {
    return this.courseService.getSectionLessons(sectionId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update/:courseId')
  @UseInterceptors(
    FileInterceptor('courseFn', {
      dest: path.join(`${storDir()}/course_photo`),
    }),
  )
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
  @Post('/buy')
  async buyCourses(@UserObj() user, @Body() cart: BuyCoursesDto) {
    return this.courseService.buy(user, cart);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/publish/:courseId')
  async publish(@Param('courseId') courseId: string) {
    try {
      return await this.courseService.publish(courseId);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/main-photo/:courseId')
  @UseInterceptors(FileInterceptor('courseFn'))
  async getCoursePhoto(@Param('courseId') courseId: string, @Res() res) {
    return this.courseService.getCoursePhoto(courseId, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-video-lesson/to-course/:courseId')
  @HttpCode(200)
  @UseInterceptors(
    AnyFilesInterceptor({ dest: path.join(storDir(), 'video_store') }),
  )
  async uploadLessonVideo(
    @Param('courseId') courseId: string,
    @UploadedFiles() videos: Express.Multer.File[],
    @Body() payload: CourseContentDto,
    @UserObj() user,
  ) {
    await this.courseService.uploadLessonVideo(
      user,
      videos,
      courseId,
      payload,
    );
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('upload-video-lesson/to-course/:courseId/section/:sectionId')
  @HttpCode(200)
  @UseInterceptors(
    AnyFilesInterceptor({ dest: path.join(storDir(), 'video_store') }),
  )
  async editVideoLesson(
    @Param('courseId') courseId: string,
    @Param('sectionId') sectionId: string,
    @UploadedFiles() videos: Express.Multer.File[],
    @Body() payload: CourseContentDto,
    @UserObj() user,
  ) {
    await this.courseService.uploadLessonVideo(
      user,
      videos,
      courseId,
      payload,
      sectionId,
    );

    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:courseId')
  @HttpCode(204)
  async delete(@Param('courseId') courseId: string, @UserObj() user) {
    return this.courseService.delete(user.id, courseId);
  }
}
