import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm";
import { UserEntity } from "../../../../types/user";
import { UserCategories } from "./user-categories.entity";

@Entity()
export class User extends BaseEntity implements UserEntity {
     
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    password: string; 

    @Column({nullable: true})
    phoneNumber: string | null;

    @Column({ unique: true })
    email: string;

    @OneToMany(() => UserCategories, userCategories => userCategories.user)
    userCategories: UserCategories[];
}