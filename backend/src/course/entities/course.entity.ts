import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CourseTopics } from './course-topics.entity';
import { Subcategory } from 'src/category/entities/subcategory.entity';
import { Section } from './section.entity';

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', default: '' })
  title: string;

  @Column({ type: 'varchar', default: '' })
  description: string;

  @Column({ type: 'text', default: '' })
  content: string;

  @Column({ default: true })
  isDraft: boolean;

  @OneToMany(() => CourseTopics, (courseTopic) => courseTopic.course, {
    nullable: true,
  })
  courseTopics: CourseTopics[];

  @OneToMany(() => Section, (section) => section.course)
  section: Section;

  @ManyToOne(() => User, (user) => user.course)
  user: User;

  @ManyToOne(() => Category, (category) => category.course, { nullable: true })
  category: Category;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.course, {
    nullable: true,
  })
  subcategory: Category;
  course: import("c:/moje/courses-app/backend/app-types/category").CategoryDto;
}
