import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';
import { Profile } from 'src/entities/profile.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>
    ) { }

    async getAllUser(): Promise<User[]> {
        try {
            return await this.userRepository.find({ relations: ['profile'] })
        } catch (err) {
            console.error(`Could get all the users`, err)
            throw new InternalServerErrorException(`Could not get all the users`)
        }
    }

    async getUserById(id: string): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ where: { id }, relations: { profile: true } })
            if (!user) throw new NotFoundException(`Could mpt get user by id ${id}`)

            return user
        } catch (err) {
            console.error(`Error getting user by id ${id}`, err)
            throw new InternalServerErrorException(`Error getting user by id ${id}`)
        }
    }

    async modifyUser(id: string, userData: Partial<CreateUserDto>): Promise<Object> {
        try {
            const user = await this.userRepository.findOne({ where: { id } })
            if (!user) throw new BadRequestException(`Could not find an user by id`)

            await this.userRepository.update(user.id, userData)

            const updatedUser = await this.userRepository.findOne({ where: { id } })
            return {
                message: `user with name ${user.name} was updated`,
                user: updatedUser
            }
        } catch (err) {
            console.error(`Error getting user by ID ${id}`, err)
            throw new InternalServerErrorException(`Error getting user by ID ${id}`)
        }
    }

    async deleteUser(id: string): Promise<Object> {
        try {
            const user = await this.userRepository.findOne({ where: { id }, relations: { profile: true } })

            if (!user) throw new NotFoundException(`Could find user with id ${id}`)

            await this.userRepository.delete(user)

            if(user.profile){
                await this.profileRepository.delete(user.profile)
            }

            return {
                message: `User with id ${id} was deleted`,
                user: user
            }
        } catch (err) {
            console.error(`Could delete user with id ${id}`, err)
            throw new InternalServerErrorException(`Could delete user with id ${id}`)
        }
    }
}
