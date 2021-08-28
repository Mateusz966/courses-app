import { Entity, BaseEntity, ManyToOne } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { User } from './user.entity';
import { IUserCategories } from '../../../app-types';

@Entity()
export class UserCategories extends BaseEntity implements IUserCategories {
  @ManyToOne(() => User, (user) => user.userCategories, { primary: true })
  user: User;

  @ManyToOne(() => Category, (category) => category.userCategories, {
    primary: true,
  })
  category: Category;
}
