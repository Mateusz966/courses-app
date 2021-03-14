import { ISubcategory } from 'app-types/category';
import { Course } from '../../course/entities/course.entity';
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from './category.entity';
import { Topic } from './topic.entity';
import { MyBaseEntity } from 'src/base/MyBaseEntity';

@Entity()
export class Subcategory extends MyBaseEntity implements ISubcategory {

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.subcategory)
  category: Category;

  @OneToMany(() => Topic, (topic) => topic.subcategory)
  topic: Topic;

  @OneToMany(() => Course, (course) => course.subcategory)
  course: Course;
}
