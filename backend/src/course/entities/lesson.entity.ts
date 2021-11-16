import { ILesson, LessonDetailsRes } from 'app-types/course';
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
export class Lesson extends MyBaseEntity implements ILesson {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  videoFn: string;

  @ManyToOne(() => Section, (section) => section.id)
  section: Section;

  static async getLessonDetailsById(lessonId: string): Promise<LessonDetailsRes> {
    const res = ((await this.createQueryBuilder('lesson')
      .where('lesson.id = :id', { id: lessonId })
      .getOneOrFail()) as unknown) as LessonDetailsRes;
    return res;
  }
}
