import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenHelper } from 'src/helpers/tokenHelper/token.service';
export declare class AuthMiddleware implements NestMiddleware {
    private tokenHelper;
    constructor(tokenHelper: TokenHelper);
    use(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;
}
