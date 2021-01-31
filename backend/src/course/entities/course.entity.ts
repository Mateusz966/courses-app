import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { CourseTopics } from './course-topics.entity';
import { Subcategory } from 'src/category/entities/subcategory.entity';

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'text', default: 'No title'})
  title: string;

  @Column({ type: 'text', default: '', nullable: true })
  description: string;

  @Column({ default: true, nullable: true })
  isDraft: boolean;

  @ManyToOne(() => User, (user) => user.course)
  user: User;

  @ManyToOne(() => Category, (category) => category.course, { nullable: true })
  category: Category;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.course, { nullable: true })
  subcategory: Category;

  @ManyToOne(() => CourseTopics, (courseTopic) => courseTopic.course, { nullable: true })
  courseTopics: CourseTopics[];
}
