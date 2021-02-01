import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Category } from './category.entity';
import { CourseTopics } from 'src/course/entities/course-topics.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Category, (category) => category.topic)
  category: Category;

  @OneToMany(() => CourseTopics, (courseTopic) => courseTopic.topic)
  courseTopics: CourseTopics[];
}
