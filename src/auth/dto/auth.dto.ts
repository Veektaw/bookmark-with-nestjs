import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}