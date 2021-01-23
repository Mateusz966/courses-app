import { Category } from "../../category/entities/category.entity";
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserCategories extends BaseEntity { 

    @ManyToOne(() => User, user => user.userCategories, { primary: true })
    user: User; 

    @ManyToOne(() => Category, category => category.userCategories, { primary: true, })
    category: Category;
} 