import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class ModifyProfileDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsInt()
    @Min(0, { message: 'Age must be a non-negative number' })
    age: number;
}