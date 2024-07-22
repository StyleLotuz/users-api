import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto{
    @IsNotEmpty()
    @IsString()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}