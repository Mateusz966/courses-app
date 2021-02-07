import { Course } from 'src/course/entities/course.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Category } from './category.entity';
import { Topic } from './topic.entity';

@Entity()
export class Subcategory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.subcategory)
  category: Category;


  @OneToMany(() => Topic, (topic) => topic.subcategory)
  topic: Topic;

  @OneToMany(() => Course, (course) => course.subcategory)
  course: Course;
}
