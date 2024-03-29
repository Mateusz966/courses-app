import { UserCategories } from "src/user/entity/user-categories.entity";
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm";
import {  CategoryDto } from '../../../../types/category'

@Entity()
export class Category extends BaseEntity implements CategoryDto {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;;
    
    @OneToMany(() => UserCategories, userCategories => userCategories.category)
    userCategories: UserCategories[];
}