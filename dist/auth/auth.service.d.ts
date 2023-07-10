import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import { TokenHelper } from "src/helpers/tokenHelper/token.service";
import { GetCurrentUserHelper } from "src/helpers/getCurrentUserHelper/getCurrentUser.service";
import { Request } from "express";
export declare class AuthService {
    private prisma;
    private tokenHelper;
    private getCurrentUserHelper;
    constructor(prisma: PrismaService, tokenHelper: TokenHelper, getCurrentUserHelper: GetCurrentUserHelper);
    login(dto: AuthDto): Promise<string>;
    getCurrentUser(req: Request): Promise<any>;
}
