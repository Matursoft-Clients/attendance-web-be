import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { ALGORITHM, JWT_SECRET_KEY } from 'src/config';

@Injectable()
export class TokenHelper {
    encode(user_uuid: string, user_email: string, user_name: string): string {
        const payload = {
            user_uuid,
            user_name,
            email: user_email,
            iat: Math.floor(Date.now() / 1000),
            expired_at: Math.floor(Date.now() / 1000) + (24 * 3600),
        };

        return jwt.sign(payload, JWT_SECRET_KEY, { algorithm: ALGORITHM });
    }

    decode(token: string): any {
        return jwt.verify(token, JWT_SECRET_KEY, { algorithms: [ALGORITHM] });
    }
}
