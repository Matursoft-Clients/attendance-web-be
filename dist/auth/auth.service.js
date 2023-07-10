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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const token_service_1 = require("../helpers/tokenHelper/token.service");
const getCurrentUser_service_1 = require("../helpers/getCurrentUserHelper/getCurrentUser.service");
let AuthService = exports.AuthService = class AuthService {
    constructor(prisma, tokenHelper, getCurrentUserHelper) {
        this.prisma = prisma;
        this.tokenHelper = tokenHelper;
        this.getCurrentUserHelper = getCurrentUserHelper;
    }
    async login(dto) {
        const user = await this.prisma.uSERS.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user)
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: 'Email or Password is Wrong',
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        const pwMatches = await bcrypt.compare(dto.password, user.password.replace('$2y$', '$2a$'));
        if (!pwMatches)
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: 'Email or Password is Wrong',
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        const token = this.tokenHelper.encode(user.uuid, user.email, user.name);
        return token;
    }
    async getCurrentUser(req) {
        try {
            const user = await this.getCurrentUserHelper.getCurrentUser(req.headers.authorization.replace('Bearer ', ''), this.prisma.uSERS);
            return user;
        }
        catch (error) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNAUTHORIZED,
                msg: 'Invalid Token',
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "getCurrentUser", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, token_service_1.TokenHelper, getCurrentUser_service_1.GetCurrentUserHelper])
], AuthService);
//# sourceMappingURL=auth.service.js.map