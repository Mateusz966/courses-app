import { ILesson } from 'app-types/course';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Section } from './section.entity';

@Entity()
export class Lesson extends BaseEntity implements ILesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  videoFn: string;

  @ManyToOne(() => Section, (section) => section.lesson)
  section: Section;
}
