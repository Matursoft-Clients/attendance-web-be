import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Request, Response } from "express";
import { AuthMiddleware } from "src/middleware/auth.middleware";

@Controller('auth')

export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() dto: AuthDto, @Res() res: Response) {
        const token = await this.authService.login(dto);

        return res.status(200).json({
            code: 200,
            msg: 'You Have Successfully Login',
            data: {
                token: token
            },
        });
    }

    @UseGuards(AuthMiddleware)
    @Get('user')
    async getCurrentUser(@Req() req: Request, @Res() res: Response) {
        // Get Current User
        const user = await this.authService.getCurrentUser(req);
        delete user["password"];

        return res.status(200).json({
            code: 200,
            msg: 'Here is the User',
            data: {
                user: user
            },
        });
    }
}