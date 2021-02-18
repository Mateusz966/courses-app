import {  ICategory, ISubcategory, ITopic, IUserCategories } from '../../../app-types/category';
import { UserCategories } from '../../user/entity/user-categories.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Topic } from './topic.entity';
import { Course } from 'src/course/entities/course.entity';
import { Subcategory } from './subcategory.entity';
import { ICourse } from 'app-types/course';

@Entity()
export class Category extends BaseEntity implements ICategory {

  @PrimaryGeneratedColumn('uuid')
  id: string;

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
