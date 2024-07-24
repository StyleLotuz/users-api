import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModifyProfileDto } from 'src/dtos/ModifyUser.dto';
import { Profile } from 'src/entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
    constructor(@InjectRepository(Profile) private profileRepository: Repository<Profile>) { }

    async getAllProfiles(): Promise<Profile[]> {
        try {
            return await this.profileRepository.find()
        } catch (err) {
            console.error(`Could get All the profiles`, err)
            throw new InternalServerErrorException(`Could get All the profiles`)
        }
    }

    async getProfileById(id: string): Promise<Profile> {
        try {
            const profile = await this.profileRepository.findOneBy({ id })

            if (!profile) throw new NotFoundException(`Could get user by id ${id}`)

            return profile
        } catch (err) {
            console.error(`Error getting user with id ${id}`, err)
            throw new InternalServerErrorException(`Error getting user with id ${id}`)
        }
    }

    async modifyProfile(id: string, userData: ModifyProfileDto): Promise<Object> {
        try {
            const profile = await this.profileRepository.findOneBy({ id })

            if(!profile) throw new NotFoundException(`Could not find user with id ${id}`)
            
            await this.profileRepository.update(id, userData)

            const updatedUser = await this.profileRepository.findOneBy({id}) 

            return {
                message: `User with id ${id} updated`,
                user: updatedUser
            }
        } catch (err) {
            console.error(`Error modifying user with id ${id}`, err)
            throw new InternalServerErrorException(`Error modifying user with id ${id}`)
        }
    }
}
