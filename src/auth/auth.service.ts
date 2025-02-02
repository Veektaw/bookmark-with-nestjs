import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, LoginDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { config } from "process";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user) {
            throw new ForbiddenException("User not found");
        }

        const pwMatch = await argon.verify(user.password, dto.password);
        if (!pwMatch) {
            throw new ForbiddenException("Incorrect password");
        }

        delete user.password;
        return this.sighToken(user.id, user.email);
    }

    async signup(dto: AuthDto) {

        try {
            const hash = await argon.hash(dto.password);
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    password: hash,
                },
            });
            delete user.password;
            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException("Email already exists");
                }
            }
        }
        throw new Error("Something went wrong");
    }

    async sighToken(userId: string, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET')
        const token =  await this.jwt.signAsync(payload, {
            expiresIn: '1d',
            secret: secret
        })

        return {
            access_token: token,
        };
    }
}