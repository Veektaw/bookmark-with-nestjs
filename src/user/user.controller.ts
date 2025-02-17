import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/guards';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    constructor( private userService: UserService) {}
    
    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }

    @Patch('edit')
    editMe(@GetUser('id') userId: string, @Body() dto: EditUserDto) {
        return this.userService.editUser(userId, dto)
    }
    
}
