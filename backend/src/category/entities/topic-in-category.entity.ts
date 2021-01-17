import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class Topic {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Category, category => category)
    category: Category
}