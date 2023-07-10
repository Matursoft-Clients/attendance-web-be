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
exports.AnnouncementService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const slug = require("slug");
const randomstring = require("randomstring");
const uuid_1 = require("uuid");
let AnnouncementService = exports.AnnouncementService = class AnnouncementService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAnnouncementDto) {
        try {
            return await this.prisma.aNNOUNCEMENTS.create({
                data: {
                    uuid: (0, uuid_1.v4)(),
                    title: createAnnouncementDto.title,
                    slug: slug(createAnnouncementDto.title) + randomstring.generate(7),
                    content: createAnnouncementDto.content,
                    created_at: new Date(),
                    updated_at: new Date()
                },
            });
        }
        catch (error) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: "Error! Please Contact Admin.",
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    async findAll() {
        const announcements = await this.prisma.aNNOUNCEMENTS.findMany();
        return announcements.map((item) => {
            const { content, ...rest } = item;
            return rest;
        });
    }
    async findOne(uuid) {
        return await this.prisma.aNNOUNCEMENTS.findUnique({ where: { uuid } });
    }
    async update(uuid, updateAnnouncementDto) {
        const announcement = await this.findOne(uuid);
        if (!announcement) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: 'Announcement failed to update!',
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return await this.prisma.aNNOUNCEMENTS.update({
            where: {
                uuid
            },
            data: {
                title: updateAnnouncementDto.title,
                content: updateAnnouncementDto.content,
                updated_at: new Date()
            }
        });
    }
    async remove(uuid) {
        const announcement = await this.findOne(uuid);
        if (!announcement) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: 'Announcement failed to delete!',
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return await this.prisma.aNNOUNCEMENTS.delete({
            where: {
                uuid
            }
        });
    }
};
exports.AnnouncementService = AnnouncementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnnouncementService);
//# sourceMappingURL=announcement.service.js.map