import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CourseTopics } from './course-topics.entity';
import { Subcategory } from 'src/category/entities/subcategory.entity';
import { Section } from './section.entity';
import { CourseStatus } from '../../../app-types/category';
import { ICourse } from '../../../app-types/course';
import { MyBaseEntity } from 'src/base/MyBaseEntity';

@Entity()
export class Course extends MyBaseEntity implements ICourse {
  @Column({ type: 'varchar', default: '' })
  title: string;

  @Column({ type: 'varchar', default: '' })
  description: string;

  @Column({ type: 'text', default: '' })
  content: string;

  @Column({ default: CourseStatus.Draft })
  courseStatus: CourseStatus;

  @OneToMany(() => CourseTopics, (courseTopic) => courseTopic.course)
  courseTopics: CourseTopics[];

  @OneToMany(() => Section, (section) => section.course)
  section: Section;

  @ManyToOne(() => User, (user) => user.course)
  user: User;

  @ManyToOne(() => Category, (category) => category.course)
  category: Category;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.course)
  subcategory: Subcategory;
}
