import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenHelper } from 'src/helpers/tokenHelper/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private tokenHelper: TokenHelper) { }
    use(req: Request, res: Response, next: NextFunction) {
        // Token
        const authHeaders = req.headers.authorization;

        if (authHeaders && (authHeaders as string).split(' ')[1]) {
            try {
                const token = (authHeaders as string).split(' ')[1];
                const decodedToken: any = this.tokenHelper.decode(token);
                if (decodedToken.expired_at < Math.floor(Date.now() / 1000)) {
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
        } else {
            return res.status(401).json({
                code: 401,
                msg: 'Unauthorized',
            });
        }

    }
}
