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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let UserService = exports.UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOne(uuid) {
        return await this.prisma.uSERS.findUnique({ where: { uuid } });
    }
    async findUserByEmail(email) {
        return await this.prisma.uSERS.findUnique({ where: { email } });
    }
    async update(uuid, updateUserDto) {
        const userInUpdate = await this.findOne(uuid);
        if (!userInUpdate) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: 'User failed to update! Record not found.',
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (updateUserDto.password) {
            if (!('password_confirmation' in updateUserDto)) {
                throw new common_1.HttpException({
                    code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    msg: 'Password confirmation is required.',
                }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
        }
        const user = await this.findUserByEmail(updateUserDto.email);
        if (user) {
            if (updateUserDto.email == user.email && userInUpdate.email !== updateUserDto.email) {
                throw new common_1.HttpException({
                    code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    msg: 'Employee failed to update! Email already in use.',
                }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
        }
        console.log(userInUpdate);
        console.log(updateUserDto.password);
        try {
            const updateEmployee = await this.prisma.uSERS.update({
                where: { uuid },
                data: {
                    name: updateUserDto.name,
                    email: updateUserDto.email,
                    password: updateUserDto.password ? await bcrypt.hash(updateUserDto.password, 10) : userInUpdate.password,
                    updated_at: new Date()
                },
            });
            return updateEmployee;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: "Error! Please Contact Admin.",
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    async updateUserPhoto(uuid, photoName) {
        try {
            await this.prisma.uSERS.update({
                where: { uuid },
                data: {
                    photo: photoName,
                },
            });
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: "Error! Please Contact Admin.",
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map