import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService){}

    @Get()
    getAllUser(){
        return this.usersService.getAllUser()
    }

    @Get(':id')
    getUserById(@Param('id', ParseUUIDPipe) id:string){
        return this.usersService.getUserById(id)
    }

    @Put(':id')
    modifyUser(@Param('id', ParseUUIDPipe)id: string, @Body() userData:Partial<CreateUserDto>){
        return this.usersService.modifyUser(id, userData)
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseUUIDPipe) id:string){
        return this.usersService.deleteUser(id)
    }
}
