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
exports.GetCurrentUserHelper = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("../tokenHelper/token.service");
const config_1 = require("../../config");
let GetCurrentUserHelper = exports.GetCurrentUserHelper = class GetCurrentUserHelper {
    constructor(tokenHelper) {
        this.tokenHelper = tokenHelper;
    }
    async getCurrentUser(token, model) {
        try {
            const decodedToken = this.tokenHelper.decode(token);
            const user_uuid = decodedToken.user_uuid;
            const user = await model.findUnique({
                where: {
                    uuid: user_uuid
                }
            });
            delete user["password"];
            user["photo"] = user['photo'] ? config_1.WEB_URL + 'user/' + user['photo'] : null;
            return user;
        }
        catch (error) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNAUTHORIZED,
                msg: "Invalid Token",
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
exports.GetCurrentUserHelper = GetCurrentUserHelper = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_service_1.TokenHelper])
], GetCurrentUserHelper);
//# sourceMappingURL=getCurrentUser.service.js.map