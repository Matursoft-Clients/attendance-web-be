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
exports.UpdateSettingDto = void 0;
const class_validator_1 = require("class-validator");
const nestjs_form_data_1 = require("nestjs-form-data");
function validateImageFile(value) {
    if (!value) {
        return true;
    }
    const validExtensions = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxFileSize = 1e6;
    if (!validExtensions.includes(value.mimetype)) {
        return false;
    }
    if (value.size > maxFileSize) {
        return false;
    }
    return true;
}
class UpdateSettingDto {
}
exports.UpdateSettingDto = UpdateSettingDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingDto.prototype, "office_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Validate)(validateImageFile),
    __metadata("design:type", nestjs_form_data_1.FileSystemStoredFile)
], UpdateSettingDto.prototype, "office_logo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, { message: 'presence_entry_start must use format hhhh:mm:ss' }),
    __metadata("design:type", String)
], UpdateSettingDto.prototype, "presence_entry_start", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, { message: 'presence_entry_end must use format hhhh:mm:ss' }),
    __metadata("design:type", String)
], UpdateSettingDto.prototype, "presence_entry_end", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, { message: 'presence_exit must use format hhhh:mm:ss' }),
    __metadata("design:type", String)
], UpdateSettingDto.prototype, "presence_exit", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingDto.prototype, "presence_location_address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], UpdateSettingDto.prototype, "presence_location_latitude", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], UpdateSettingDto.prototype, "presence_location_longitude", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumberString)({}, { message: 'presence_meter_radius must be a number' }),
    __metadata("design:type", Number)
], UpdateSettingDto.prototype, "presence_meter_radius", void 0);
//# sourceMappingURL=update-setting.dto.js.map