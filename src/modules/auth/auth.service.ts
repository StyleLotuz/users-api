import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';
import { Profile } from 'src/entities/profile.entity';
import { User } from 'src/entities/user.entity';
import { calculateAge } from 'src/helpers/calculateAge';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from 'src/dtos/LoginUser.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userReposity: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>
    ) { }

    async signUp(userData: CreateUserDto): Promise<Partial<User>> {
        try {
            const user = await this.userReposity.findOne({ where: { email: userData.email } })

            if (user) {
                throw new BadRequestException(`Already exists an user with this email ${user.email}`)
            }

            if (userData.password !== userData.confirmPassword) {
                throw new BadRequestException(`Password does not match`)
            }

            const newAge = calculateAge(userData.dateOfBirth)

            const newProfile: Profile = this.profileRepository.create({
                name: userData.name,
                age: newAge,
            })

            await this.profileRepository.save(newProfile)

            const hashedPassword = await bcrypt.hash(userData.password, 10)

            const newUser: User = this.userReposity.create({
                name: userData.username,
                email: userData.email,
                gender: userData.gender,
                address: userData.address,
                password: hashedPassword,
                dateOfBirth: userData.dateOfBirth,
                profile: newProfile
            })

            await this.userReposity.save(newUser)

            const { password, ...userWithoutPassword } = newUser

            return userWithoutPassword
        } catch (err) {
            if (err instanceof BadRequestException) {
                throw err
            }

            console.error(`Could not create a new User`, err)
            throw new InternalServerErrorException(`Could not create a new User`)
        }
    }

    async signIn(loginData: LoginUserDto): Promise<Object> {
        const { email, password } = loginData

        try {
            const user = await this.userReposity.findOne({ where: { email } })

            if(!user) throw new UnauthorizedException(`Your credentials are invalid`)

            const isMatch = await bcrypt.compare(user.password, password)

            if(!isMatch) throw new UnauthorizedException(`Your credentials are invalid`)

            return {
                message: `Login Succesfully`,
                user
            }
        } catch (err) {
            console.error(`Could login something was wrong`, err)
            throw new InternalServerErrorException(`Could login something was wrong`)
        }
    }
}
