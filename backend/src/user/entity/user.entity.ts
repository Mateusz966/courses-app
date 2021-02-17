import { Course } from 'src/course/entities/course.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { IUser } from '../../../app-types/user';
import { UserCategories } from './user-categories.entity';

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber: string | null;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => UserCategories, (userCategories) => userCategories.user)
  userCategories: UserCategories;

  @OneToMany(() => Course, (course) => course.user)
  course: Course;
}
