import { IsEmail, IsNotEmpty, IsOptional, IsString, isString } from "class-validator";


export class EditUserDto {

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;
}