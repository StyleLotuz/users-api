import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EGender } from "src/enum/gender.enum";
import { Transform } from "class-transformer";

export class CreateUserDto {
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

    @Transform(({value})=> new Date(value))
    @IsNotEmpty()
    @IsDate()
    dateOfBirth: Date
}