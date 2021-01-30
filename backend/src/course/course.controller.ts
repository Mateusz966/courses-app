import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserObj } from 'decorators/user-obj.decorator';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('/my-all')
  async all(@UserObj() user) {
    return await this.courseService.myAll(user.id);
  };

  @Post('/add')
  async add(@Body() payload, @UserObj() user) {
    return await this.courseService.add(payload);
  }

  @Post('/update/:courseId')
  async update() {
    
  }
}
