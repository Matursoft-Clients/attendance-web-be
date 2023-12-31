import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Request, Response } from "express";
import { FormDataRequest } from "nestjs-form-data";

@Controller('auth')

export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @FormDataRequest()
    async login(@Body() dto: AuthDto, @Res() res: Response) {

        const token = await this.authService.login(dto);

        return res.status(200).json({
            code: 200,
            msg: 'You Have Successfully Login',
            data: {
                token
            },
        });
    }

    @Get('user')
    async getCurrentUser(@Req() req: Request, @Res() res: Response) {
        // Get Current User
        const user = await this.authService.getCurrentUser(req);

        return res.status(200).json({
            code: 200,
            msg: 'Here is the User',
            data: {
                user: user
            },
        });
    }

    @Get('dashboard')
    async dashboard(@Res() res: Response) {
        // Get Current User
        const dashboard = await this.authService.dashboard();
        console.log(dashboard)

        return res.status(200).json({
            code: 200,
            msg: 'Here is the Dashboard',
            data:
                dashboard
            ,
        });
    }
}