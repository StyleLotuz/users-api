import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';
import { Profile } from 'src/entities/profile.entity';
import { User } from 'src/entities/user.entity';
import { calculateAge } from 'src/helpers/calculateAge';
import { Repository } from 'typeorm';
import { LoginUserDto } from 'src/dtos/LoginUser.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>
    ) { }

    async signUp(userData: CreateUserDto): Promise<Partial<User>> {
        try {
            const user = await this.userRepository.findOne({ where: { email: userData.email } });
    
            if (user) {
                throw new BadRequestException(`Already exists a user with this email ${user.email}`);
            }
    
            if (userData.password !== userData.confirmPassword) {
                throw new BadRequestException(`Password does not match`);
            }
    
            const newAge = calculateAge(userData.dateOfBirth);
    
            const newProfile = this.profileRepository.create({
                name: userData.username,
                age: newAge,
            });
    
            console.log(userData.password)

            await this.profileRepository.save(newProfile);
    
            const hashedPassword = await bcrypt.hash(userData.password, 10);
    
            console.log(userData.dateOfBirth, "FECHA DE NACIMIENTO")

            const newUser = this.userRepository.create({
                name: userData.name,
                email: userData.email,
                gender: userData.gender,
                address: userData.address,
                password: hashedPassword,
                dateOfBirth: userData.dateOfBirth,
                profile: newProfile,
            });
    
    
            await this.userRepository.save(newUser);

    
            const { password, ...userWithoutPassword } = newUser;
            return userWithoutPassword;
        } catch (err) {
            if (err instanceof BadRequestException) {
                throw err;
            }
    
            console.error(`Could not create a new User`, err);
            throw new InternalServerErrorException(`Could not create a new User`);
        }
    }

    async signIn(loginData: LoginUserDto): Promise<Object> {
        const { email, password } = loginData

        try {
            const user = await this.userRepository.findOne({ where: { email } })

            if(!user) throw new UnauthorizedException(`Your credentials are invalid`)

            console.log(user.password)
            console.log(password)

            const isMatch = await bcrypt.compare(password, user.password)

            console.log(isMatch)

            if(!isMatch) throw new UnauthorizedException(`Your credentials are invalid`)

            return {
                message: `Login Succesfully`,
                user
            }
        } catch (err) {
            if(err instanceof UnauthorizedException) throw err

            console.error(`Could login something was wrong`, err)
            throw new InternalServerErrorException(`Could login something was wrong`)
        }
    }
}
