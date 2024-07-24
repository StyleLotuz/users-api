import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar' })
    name: string
    
    @Column({ type: 'int' })
    age: number

    @OneToOne(() => User, user => user.profile)
    user: User
}