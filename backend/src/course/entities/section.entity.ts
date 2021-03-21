import { ISection } from 'app-types/course';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Course } from './course.entity';
import { Lesson } from './lesson.entity';

@Entity()
export class Section extends BaseEntity implements ISection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @OneToMany(() => Lesson, (lesson) => lesson.section)
  lesson: Lesson;

  @ManyToOne(() => Course, (course) => course.section)
  course: Course;
}
