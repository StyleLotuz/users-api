import { EGender } from "src/enum/gender.enum";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Profile } from "./profile.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar' })
    name: string

    @Column({ type: 'varchar' })
    email: string
    
    @Column({ type: 'varchar' })
    address: string

    @Column({ type: 'varchar' })
    password: string

    @Column({ type: 'date' })
    dateOfBirth: Date

    @Column({ type: 'varchar' })
    gender: string

    @OneToOne(() => Profile, profile => profile.user, { cascade: true })
    @JoinColumn()
    profile: Profile
}