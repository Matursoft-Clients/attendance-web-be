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
exports.BannerController = void 0;
const common_1 = require("@nestjs/common");
const banner_service_1 = require("./banner.service");
const dto_1 = require("./dto");
const nestjs_form_data_1 = require("nestjs-form-data");
const path_1 = require("path");
const fs_1 = require("fs");
const randomstring = require("randomstring");
const config_1 = require("../config");
let BannerController = exports.BannerController = class BannerController {
    constructor(bannerService) {
        this.bannerService = bannerService;
    }
    async create(createBannerDto, res) {
        const image = createBannerDto.image;
        const fileExtension = image.originalName.split('.').pop();
        const fileName = randomstring.generate(10) + '.' + fileExtension;
        const filePath = (0, path_1.join)(config_1.FILE_PATH, 'banner', fileName);
        (0, fs_1.copyFileSync)(image.path, filePath);
        const createdBanner = await this.bannerService.create(createBannerDto, fileName);
        return res.status(200).json({
            code: 200,
            msg: `Banner ${createdBanner.name} has been created successfully`,
        });
    }
    async findAll(res) {
        const banners = await this.bannerService.findAll();
        return res.status(200).json({
            code: 200,
            msg: 'Here is Your Banners',
            data: {
                banners
            },
        });
    }
    async remove(uuid, res) {
        const banner = await this.bannerService.remove(uuid);
        const oldFilePath = (0, path_1.join)(config_1.FILE_PATH, 'banner', banner.image);
        (0, fs_1.unlink)(oldFilePath, (err) => {
            if (err) {
                console.error('Gagal menghapus foto lama:', err);
            }
            else {
                console.log('Foto lama berhasil dihapus');
            }
        });
        return res.status(200).json({
            code: 200,
            msg: 'Banner ' + banner.name + ' has been Deleted'
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, nestjs_form_data_1.FormDataRequest)({ storage: nestjs_form_data_1.FileSystemStoredFile }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateBannerDto, Object]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(':uuid'),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "remove", null);
exports.BannerController = BannerController = __decorate([
    (0, common_1.Controller)('banners'),
    __metadata("design:paramtypes", [banner_service_1.BannerService])
], BannerController);
//# sourceMappingURL=banner.controller.js.map