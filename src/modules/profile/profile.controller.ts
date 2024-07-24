import { Body, Controller, Get, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from 'src/entities/profile.entity';
import { ModifyProfileDto } from 'src/dtos/ModifyUser.dto';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Get()
    getAllProfiles() {
        return this.profileService.getAllProfiles()
    }

    @Get(':id')
    getProfileById(id:string){
        return this.profileService.getProfileById(id)
    }

    @Put(':id')
    modifyProfile(@Param('id', ParseUUIDPipe) id: string, @Body() userData: ModifyProfileDto){
        return this.profileService.modifyProfile(id, userData)
    }
}
