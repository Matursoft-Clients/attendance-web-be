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
exports.SettingController = void 0;
const common_1 = require("@nestjs/common");
const setting_service_1 = require("./setting.service");
const dto_1 = require("./dto");
const nestjs_form_data_1 = require("nestjs-form-data");
const fs_1 = require("fs");
const path_1 = require("path");
const randomstring = require("randomstring");
const config_1 = require("../config");
let SettingController = exports.SettingController = class SettingController {
    constructor(settingService) {
        this.settingService = settingService;
    }
    async findAll(res) {
        const settings = await this.settingService.findAll();
        return res.status(200).json({
            code: 200,
            msg: 'Here is Your Settings',
            data: {
                settings
            },
        });
    }
    async update(uuid, updateSettingDto, res) {
        const office_logo = updateSettingDto.office_logo;
        await this.settingService.update(uuid, updateSettingDto);
        if (office_logo) {
            const fileExtension = office_logo.originalName.split('.').pop();
            const fileName = randomstring.generate(10) + '.' + fileExtension;
            const filePath = (0, path_1.join)(config_1.FILE_PATH, 'setting', fileName);
            (0, fs_1.copyFileSync)(office_logo.path, filePath);
            const setting = await this.settingService.findOne(uuid);
            if (setting && setting.office_logo) {
                const oldFilePath = (0, path_1.join)(config_1.FILE_PATH, 'setting', setting.office_logo);
                (0, fs_1.unlink)(oldFilePath, (err) => {
                    if (err) {
                        console.error('Gagal menghapus foto lama:', err);
                    }
                    else {
                        console.log('Foto lama berhasil dihapus');
                    }
                });
            }
            await this.settingService.updateSettingOfficeLogo(uuid, fileName);
        }
        console.log(updateSettingDto);
        return res.status(200).json({
            code: 200,
            msg: 'Setting Successfully Updated',
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "findAll", null);
__decorate([
    (0, nestjs_form_data_1.FormDataRequest)({ storage: nestjs_form_data_1.FileSystemStoredFile }),
    (0, common_1.Patch)(':uuid'),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateSettingDto, Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "update", null);
exports.SettingController = SettingController = __decorate([
    (0, common_1.Controller)('settings'),
    __metadata("design:paramtypes", [setting_service_1.SettingService])
], SettingController);
//# sourceMappingURL=setting.controller.js.map