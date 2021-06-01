import { ILesson } from 'app-types/course';
import { MyBaseEntity } from 'src/base/MyBaseEntity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Section } from './section.entity';

@Entity()
export class Lesson extends BaseEntity implements ILesson {

  @PrimaryColumn({type: 'uuid'})
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  videoFn: string;

  @ManyToOne(() => Section, (section) => section.id)
  section: Section;
}
