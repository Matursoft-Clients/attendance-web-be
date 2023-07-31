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
            console.log(error)
            throw new HttpException(
                {
                    code: HttpStatus.UNAUTHORIZED,
                    msg: 'Invalid Token',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }
    }

    async dashboard() {
        try {


            // Get Current User
            const amount_employees = await this.prisma.$queryRaw`SELECT COUNT(*) as amount_employees FROM EMPLOYEES`
            const amount_branches = await this.prisma.$queryRaw`SELECT COUNT(*) as amount_branches FROM BRANCHES`
            const amount_daily_attendances = await this.prisma.$queryRaw`SELECT COUNT(*) as amount_daily_attendances FROM DAILY_ATTENDANCES 
                WHERE DATE_FORMAT(DAILY_ATTENDANCES.date, '%Y-%m-%d') = CURDATE() 
                    AND DAILY_ATTENDANCES.presence_entry_status IS NOT NULL`

            const dashboard = {
                amount_employees: Number(amount_employees[0].amount_employees) || 0,
                amount_branches: Number(amount_branches[0].amount_branches) || 0,
                amount_daily_attendances: Number(amount_daily_attendances[0].amount_daily_attendances) || 0
            }

            console.log(dashboard)

            return dashboard

        } catch (error) {
            console.log(error)
            throw new HttpException(
                {
                    code: HttpStatus.UNPROCESSABLE_ENTITY,
                    msg: "Error! Please Contact Admin.",
                },
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }
    }
}