import { Body, Controller, ForbiddenException, HttpCode, HttpStatus, InternalServerErrorException, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, LoginDto } from "./dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {
        
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    async signup(@Body() dto: AuthDto) {
        try {
            const user = await this.authService.signup(dto);
            return user;
        } catch (error) {
            if (error instanceof ForbiddenException) {
            throw error;
            }
            throw new InternalServerErrorException('Something went wrong during signup');
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    } 
}