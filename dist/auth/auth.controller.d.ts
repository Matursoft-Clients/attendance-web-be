import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Request, Response } from "express";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: AuthDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getCurrentUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
