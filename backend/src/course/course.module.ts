import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/category/category.module';
import { VimeoModule } from 'src/vimeo/vimeo.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports: [VimeoModule, CategoryModule]
})
export class CourseModule {}
