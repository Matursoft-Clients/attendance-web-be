import { TokenHelper } from "../tokenHelper/token.service";
export declare class GetCurrentUserHelper {
    private tokenHelper;
    constructor(tokenHelper: TokenHelper);
    getCurrentUser(token: string, model: any): Promise<any>;
}
