import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenHelper } from 'src/helpers/tokenHelper/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private tokenHelper: TokenHelper) { }
    use(req: Request, res: Response, next: NextFunction) {
        // Token
        const token = req.headers.authorization.replace('Bearer ', '');

        console.log(token)
        try {
            const decodedToken = this.tokenHelper.decode(token);
            if (decodedToken.expired_at < Date.now()) {
                return res.status(498).json({
                    code: 498,
                    msg: 'Your Token is Expired',
                });
            }
        } catch (error) {
            return res.status(406).json({
                code: 406,
                msg: 'Your Token is Broken',
            });
        }

        next();
    }
}
