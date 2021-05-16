import { Module } from '@nestjs/common';
import { VimeoModule } from 'src/vimeo/vimeo.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports: [VimeoModule]
})
export class CourseModule {}
