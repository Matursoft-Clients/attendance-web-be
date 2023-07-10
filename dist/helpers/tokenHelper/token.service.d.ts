export declare class TokenHelper {
    encode(user_uuid: string, user_email: string, user_name: string): string;
    decode(token: string): any;
}
