import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { UserEntity } from "../../../../types/user";

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
}