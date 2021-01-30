import { User } from 'src/user/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: true })
  isDraft: boolean;

  @ManyToOne(() => User, (user) => user.course)
  user: User;
}
