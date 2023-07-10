"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("../helpers/tokenHelper/token.service");
let AuthMiddleware = exports.AuthMiddleware = class AuthMiddleware {
    constructor(tokenHelper) {
        this.tokenHelper = tokenHelper;
    }
    use(req, res, next) {
        const authHeaders = req.headers.authorization;
        if (authHeaders && authHeaders.split(' ')[1]) {
            try {
                const token = authHeaders.split(' ')[1];
                const decodedToken = this.tokenHelper.decode(token);
                if (decodedToken.expired_at < Math.floor(Date.now() / 1000)) {
                    return res.status(498).json({
                        code: 498,
                        msg: 'Your Token is Expired',
                    });
                }
            }
            catch (error) {
                return res.status(406).json({
                    code: 406,
                    msg: 'Your Token is Broken',
                });
            }
            next();
        }
        else {
            return res.status(401).json({
                code: 401,
                msg: 'Unauthorized',
            });
        }
    }
};
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_service_1.TokenHelper])
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map