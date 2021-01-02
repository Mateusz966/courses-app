import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import {  CategoryDto } from '../../../../types/category'

@Entity()
export class Category extends BaseEntity implements CategoryDto {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

}