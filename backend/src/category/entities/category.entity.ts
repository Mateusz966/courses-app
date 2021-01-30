import { CategoryDto } from "../../../app-types/category";
import { UserCategories } from "../../user/entity/user-categories.entity";
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import { Topic } from "./topic.entity";

@Entity()
export class Category extends BaseEntity implements CategoryDto {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;;
    
    @OneToMany(() => UserCategories, userCategories => userCategories.category)
    userCategories: UserCategories;

    @ManyToOne(() => Topic, topic => topic.category)
    topic: Topic; 
}