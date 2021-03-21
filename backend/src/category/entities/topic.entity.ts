import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { Category } from './category.entity';
import { CourseTopics } from 'src/course/entities/course-topics.entity';
import { Subcategory } from './subcategory.entity';
import { ITopic } from '../../../app-types/category';

@Entity()
export class Topic extends BaseEntity implements ITopic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.topic)
  category: Category;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.topic)
  subcategory: Subcategory;

  @OneToMany(() => CourseTopics, (courseTopic) => courseTopic.topic)
  courseTopics: CourseTopics[];
}
