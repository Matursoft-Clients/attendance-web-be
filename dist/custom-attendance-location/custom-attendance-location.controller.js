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
exports.CustomAttendanceLocationController = void 0;
const common_1 = require("@nestjs/common");
const custom_attendance_location_service_1 = require("./custom-attendance-location.service");
const dto_1 = require("./dto");
const nestjs_form_data_1 = require("nestjs-form-data");
let CustomAttendanceLocationController = exports.CustomAttendanceLocationController = class CustomAttendanceLocationController {
    constructor(customAttendanceLocationService) {
        this.customAttendanceLocationService = customAttendanceLocationService;
    }
    async create(createCustomAttendanceLocationDto, res) {
        await this.customAttendanceLocationService.create(createCustomAttendanceLocationDto);
        return res.status(200).json({
            code: 200,
            msg: `Custom attendance location has been created`,
        });
    }
    async findAll(res) {
        const customAttendanceLocations = await this.customAttendanceLocationService.findAll();
        return res.status(200).json({
            code: 200,
            msg: 'Custom attendance locations',
            data: {
                customAttendanceLocations
            },
        });
    }
    async remove(uuid, res) {
        await this.customAttendanceLocationService.remove(uuid);
        return res.status(200).json({
            code: 200,
            msg: 'Custom attendance location has been deleted'
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, nestjs_form_data_1.FormDataRequest)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCustomAttendanceLocationDto, Object]),
    __metadata("design:returntype", Promise)
], CustomAttendanceLocationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomAttendanceLocationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(':uuid'),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CustomAttendanceLocationController.prototype, "remove", null);
exports.CustomAttendanceLocationController = CustomAttendanceLocationController = __decorate([
    (0, common_1.Controller)('custom-attendance-locations'),
    __metadata("design:paramtypes", [custom_attendance_location_service_1.CustomAttendanceLocationService])
], CustomAttendanceLocationController);
//# sourceMappingURL=custom-attendance-location.controller.js.map