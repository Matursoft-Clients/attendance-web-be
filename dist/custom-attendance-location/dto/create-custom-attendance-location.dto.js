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
exports.CreateCustomAttendanceLocationDto = void 0;
const class_validator_1 = require("class-validator");
class CreateCustomAttendanceLocationDto {
}
exports.CreateCustomAttendanceLocationDto = CreateCustomAttendanceLocationDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCustomAttendanceLocationDto.prototype, "employee_uuid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], CreateCustomAttendanceLocationDto.prototype, "start_date", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], CreateCustomAttendanceLocationDto.prototype, "end_date", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomAttendanceLocationDto.prototype, "presence_location_address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsLatitude)({ message: 'presence_location_latitude must be a longitude number' }),
    __metadata("design:type", Number)
], CreateCustomAttendanceLocationDto.prototype, "presence_location_latitude", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsLongitude)({ message: 'presence_location_longitude must be a longitude number' }),
    __metadata("design:type", Number)
], CreateCustomAttendanceLocationDto.prototype, "presence_location_longitude", void 0);
//# sourceMappingURL=create-custom-attendance-location.dto.js.map