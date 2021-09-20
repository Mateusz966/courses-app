import { ISection } from 'app-types/course';
import { MyBaseEntity } from 'src/base/MyBaseEntity';
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
export class Section extends MyBaseEntity implements ISection {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @OneToMany(() => Lesson, (lesson) => lesson.section)
  lesson: Lesson;

  @ManyToOne(() => Course, (course) => course.section)
  course: Course;
}
