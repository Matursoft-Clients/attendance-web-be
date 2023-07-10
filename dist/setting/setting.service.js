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
exports.SettingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("../config");
let SettingService = exports.SettingService = class SettingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const setting = await this.prisma.sETTINGS.findFirst();
        setting['office_logo'] = setting['office_logo'] ? config_1.WEB_URL + 'setting/' + setting['office_logo'] : null;
        return setting;
    }
    async update(uuid, updateSettingDto) {
        const settingInUpdate = await this.findOne(uuid);
        if (!settingInUpdate) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: 'Setting failed to update! Record not found.',
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        try {
            const updateSetting = await this.prisma.sETTINGS.update({
                where: {
                    uuid
                },
                data: {
                    office_name: updateSettingDto.office_name,
                    presence_entry_start: updateSettingDto.presence_entry_start,
                    presence_entry_end: updateSettingDto.presence_entry_end,
                    presence_exit: updateSettingDto.presence_exit,
                    presence_location_address: updateSettingDto.presence_location_address,
                    presence_location_latitude: +updateSettingDto.presence_location_latitude,
                    presence_location_longitude: +updateSettingDto.presence_location_longitude,
                    presence_meter_radius: +updateSettingDto.presence_meter_radius,
                    updated_at: new Date()
                }
            });
            return updateSetting;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: "Error! Please Contact Admin.",
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    async updateSettingOfficeLogo(uuid, officeLogoName) {
        try {
            await this.prisma.sETTINGS.update({
                where: { uuid },
                data: { office_logo: officeLogoName },
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
    async findOne(uuid) {
        return await this.prisma.sETTINGS.findUnique({ where: { uuid } });
    }
};
exports.SettingService = SettingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SettingService);
//# sourceMappingURL=setting.service.js.map