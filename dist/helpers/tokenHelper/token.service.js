"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenHelper = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const config_1 = require("../../config");
let TokenHelper = exports.TokenHelper = class TokenHelper {
    encode(user_uuid, user_email, user_name) {
        const payload = {
            user_uuid,
            user_name,
            email: user_email,
            iat: Math.floor(Date.now() / 1000),
            expired_at: Math.floor(Date.now() / 1000) + (24 * 3600),
        };
        return jwt.sign(payload, config_1.JWT_SECRET_KEY, { algorithm: config_1.ALGORITHM });
    }
    decode(token) {
        return jwt.verify(token, config_1.JWT_SECRET_KEY, { algorithms: [config_1.ALGORITHM] });
    }
};
exports.TokenHelper = TokenHelper = __decorate([
    (0, common_1.Injectable)()
], TokenHelper);
//# sourceMappingURL=token.service.js.map