import { ILesson } from 'app-types/course';
import { MyBaseEntity } from 'src/base/MyBaseEntity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Section } from './section.entity';

@Entity()
export class Lesson extends MyBaseEntity implements ILesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  videoFn: string;

  @ManyToOne(() => Section, (section) => section.lesson)
  section: Section;
}
