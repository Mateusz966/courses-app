import { Exclude } from 'class-transformer';
import { Course } from 'src/course/entities/course.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IUser } from '../../../app-types';
import { UserCategories } from './user-categories.entity';
import { PublicFile } from '../../file/public-file.entity';

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  photoFn: string;

  @JoinColumn()
  @OneToOne(() => PublicFile, {
    eager: true,
    nullable: true,
  })
  avatar?: PublicFile;

  @OneToMany(() => UserCategories, (userCategories) => userCategories.user)
  userCategories: UserCategories[];

  @OneToMany(() => Course, (course) => course.user)
  course: Course;
}
