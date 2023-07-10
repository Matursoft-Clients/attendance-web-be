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
exports.AnnouncementController = void 0;
const common_1 = require("@nestjs/common");
const announcement_service_1 = require("./announcement.service");
const dto_1 = require("./dto");
const nestjs_form_data_1 = require("nestjs-form-data");
let AnnouncementController = exports.AnnouncementController = class AnnouncementController {
    constructor(announcementService) {
        this.announcementService = announcementService;
    }
    async create(createAnnouncementDto, res) {
        const CreateAnnouncement = await this.announcementService.create(createAnnouncementDto);
        return res.status(200).json({
            code: 200,
            msg: `Announcement ${CreateAnnouncement.title} has been created successfully`,
        });
    }
    async findAll(res) {
        const announcements = await this.announcementService.findAll();
        return res.status(200).json({
            code: 200,
            msg: 'Here is Your Announcements',
            data: {
                announcements
            },
        });
    }
    async findOne(uuid, res) {
        const announcement = await this.announcementService.findOne(uuid);
        if (announcement == null) {
            return res.status(422).json({
                code: 422,
                msg: 'Announcement not found!'
            });
        }
        return res.status(200).json({
            code: 200,
            msg: 'Here is Your Announcement',
            data: {
                announcement
            },
        });
    }
    async update(uuid, updateAnnouncementDto, res) {
        const updateAnnouncement = await this.announcementService.update(uuid, updateAnnouncementDto);
        return res.status(200).json({
            code: 200,
            msg: 'Announcement has been updated successfully',
            data: {
                updateAnnouncement
            },
        });
    }
    async remove(uuid, res) {
        const announcement = await this.announcementService.remove(uuid);
        return res.status(200).json({
            code: 200,
            msg: 'Banner ' + announcement.title + ' has been Deleted'
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, nestjs_form_data_1.FormDataRequest)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAnnouncementDto, Object]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':uuid'),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':uuid'),
    (0, nestjs_form_data_1.FormDataRequest)(),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateAnnouncementDto, Object]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':uuid'),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "remove", null);
exports.AnnouncementController = AnnouncementController = __decorate([
    (0, common_1.Controller)('announcements'),
    __metadata("design:paramtypes", [announcement_service_1.AnnouncementService])
], AnnouncementController);
//# sourceMappingURL=announcement.controller.js.map