import {  ICategory} from '../../../app-types/category';
import { UserCategories } from '../../user/entity/user-categories.entity';
import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm';
import { Topic } from './topic.entity';
import { Course } from 'src/course/entities/course.entity';
import { Subcategory } from './subcategory.entity';
import { MyBaseEntity } from 'src/base/MyBaseEntity';

@Entity()
export class Category extends MyBaseEntity implements ICategory {

  @Column()
  name: string;

  @OneToMany(() => UserCategories, (userCategories) => userCategories.category)
  userCategories: UserCategories[];

  @OneToMany(() => Course, (course) => course.category)
  course: Course;

  @OneToMany(() => Topic, (topic) => topic.category)
  topic: Topic;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategory: Subcategory;
}
