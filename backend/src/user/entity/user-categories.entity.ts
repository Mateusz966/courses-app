import { Category } from "src/category/entities/category.entity";
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserCategories extends BaseEntity {
     
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.userCategories)
    user: User; 

    @ManyToOne(() => Category, category => category.userCategories)
    category: Category;
} 