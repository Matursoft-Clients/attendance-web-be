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
exports.BannerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
const config_1 = require("../config");
let BannerService = exports.BannerService = class BannerService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBannerDto, imageFileName) {
        try {
            const createBanner = await this.prisma.bANNERS.create({
                data: {
                    uuid: (0, uuid_1.v4)(),
                    name: createBannerDto.name,
                    image: imageFileName,
                    created_at: new Date(),
                    updated_at: new Date()
                },
            });
            return createBanner;
        }
        catch (error) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: "Error! Please Contact Admin.",
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    async findAll() {
        const banners = await this.prisma.bANNERS.findMany();
        banners.map((e) => {
            e.image = config_1.WEB_URL + 'banner/' + e.image;
        });
        return banners;
    }
    async findOne(uuid) {
        return await this.prisma.bANNERS.findUnique({ where: { uuid } });
    }
    async remove(uuid) {
        const banner = await this.findOne(uuid);
        if (!banner) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: 'Banner failed to delete! Record not found.',
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return await this.prisma.bANNERS.delete({ where: { uuid } });
    }
};
exports.BannerService = BannerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BannerService);
//# sourceMappingURL=banner.service.js.map