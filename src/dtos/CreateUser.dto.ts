import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EGender } from "src/enum/gender.enum";

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    username: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsEnum(EGender)
    gender: EGender

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsOptional()
    @IsString()
    address: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    confirmPassword: string

    @IsDate()
    @IsNotEmpty()
    dateOfBirth: Date
}   