import { HttpException, HttpStatus, Injectable, Req } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as bcrypt from 'bcrypt';
import { TokenHelper } from "src/helpers/tokenHelper/token.service";
import { GetCurrentUserHelper } from "src/helpers/getCurrentUserHelper/getCurrentUser.service";
import { Request } from "express";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private tokenHelper: TokenHelper, private getCurrentUserHelper: GetCurrentUserHelper) { }

    async login(dto: AuthDto) {

        // find the user by email
        const user =
            await this.prisma.uSERS.findUnique({
                where: {
                    email: dto.email,
                },
            });

        // if user does not exist throw exception
        if (!user)
            throw new HttpException(
                {
                    code: HttpStatus.UNPROCESSABLE_ENTITY,
                    msg: 'Email or Password is Wrong',
                },
                HttpStatus.UNPROCESSABLE_ENTITY,
            );

        // compare password
        const pwMatches = await bcrypt.compare(
            dto.password,
            user.password.replace('$2y$', '$2a$'),
        );

        // if password incorrect throw exception
        if (!pwMatches)
            throw new HttpException(
                {
                    code: HttpStatus.UNPROCESSABLE_ENTITY,
                    msg: 'Email or Password is Wrong',
                },
                HttpStatus.UNPROCESSABLE_ENTITY,
            );

        // Generate Token
        const token = this.tokenHelper.encode(user.uuid, user.email, user.name);

        return token;
    }

    async getCurrentUser(@Req() req: Request) {
        try {
            // Get Current User
            const user = await this.getCurrentUserHelper.getCurrentUser(req.headers.authorization.replace('Bearer ', ''), this.prisma.uSERS);

            return user;

        } catch (error) {
            throw new HttpException(
                {
                    code: HttpStatus.UNAUTHORIZED,
                    msg: 'Invalid Token',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }
    }
}