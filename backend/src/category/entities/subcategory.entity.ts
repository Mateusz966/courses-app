import { Course } from 'src/course/entities/course.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Subcategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.subcategory)
  category: Category;

  @OneToMany(() => Course, (course) => course.subcategory)
  course: Course;
}
