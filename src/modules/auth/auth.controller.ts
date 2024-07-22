import { CreateUserDto } from 'src/dtos/CreateUser.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/dtos/LoginUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('signup')
    signUp(@Body() userData: CreateUserDto){
        return this.authService.signUp(userData)
    }

    @Post('signin')
    signIn(@Body() loginData: LoginUserDto){
        return this.authService.signIn(loginData)
    }
}
