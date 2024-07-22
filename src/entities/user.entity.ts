import { EGender } from "src/enum/gender.enum";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'varchar'})
    name: string

    @Column({type: 'varchar'})
    email: string
    
    @Column({type: 'varchar'})
    address: string

    @Column({type: 'varchar'})
    password: string

    @Column({type: 'date'})
    dateOfBirth: Date

    @Column({type: 'string'})
    gender: EGender

    @OneToOne(()=> Profile, profile => profile.user, {cascade: true})
    profile: Profile
}