import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserObj } from 'decorators/user-obj.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/my-all')
  async all(@UserObj() user) {
    try {
      return await this.courseService.myAll(user.id);
    } catch (error) {
      throw error
    }
  };

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async add(@UserObj() user, @Body() categoriesDetails: any) {
    try {
      return await this.courseService.add(user, categoriesDetails);
    } catch (error) {
      throw error;
    }
  }

  @Post('/update/:courseId')
  async update() {
    
  }
}
