import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenHelper {
    constructor(private config: ConfigService) { }
    encode(user_uuid: string, user_email: string, user_name: string): string {
        const alg = 'HS256';
        const key = this.config.get('JWT_SECRET_KEY')
        const payload = {
            user_uuid,
            user_name,
            email: user_email,
            iat: Math.floor(Date.now() / 1000),
            expired_at: Math.floor(Date.now() / 1000) + (24 * 3600),
        };

        return jwt.sign(payload, key, { algorithm: alg });
    }

    decode(token: string): any {
        const alg = 'HS256';
        const key = this.config.get('JWT_SECRET_KEY')
        return jwt.verify(token, key, { algorithms: [alg] });
    }
}
