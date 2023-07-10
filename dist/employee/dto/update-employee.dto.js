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
exports.UpdateEmployeeDto = exports.UpdatePasswordMatchConstraint = void 0;
const class_validator_1 = require("class-validator");
const nestjs_form_data_1 = require("nestjs-form-data");
let UpdatePasswordMatchConstraint = exports.UpdatePasswordMatchConstraint = class UpdatePasswordMatchConstraint {
    validate(value, args) {
        const password = args.object.password;
        const confirmPassword = value;
        console.log(confirmPassword);
        if (!password && !confirmPassword) {
            return true;
        }
        return password === confirmPassword;
    }
    defaultMessage(args) {
        return `Passwords do not match.`;
    }
};
exports.UpdatePasswordMatchConstraint = UpdatePasswordMatchConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'passwordMatch', async: false })
], UpdatePasswordMatchConstraint);
function ValidatePasswordConfirmation(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'validatePasswordConfirmation',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: UpdatePasswordMatchConstraint,
        });
    };
}
class UpdateEmployeeDto {
}
exports.UpdateEmployeeDto = UpdateEmployeeDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEmployeeDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateEmployeeDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEmployeeDto.prototype, "job_position_uuid", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], UpdateEmployeeDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    ValidatePasswordConfirmation(),
    __metadata("design:type", String)
], UpdateEmployeeDto.prototype, "password_confirmation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Validate)(validateImageFile),
    __metadata("design:type", nestjs_form_data_1.FileSystemStoredFile)
], UpdateEmployeeDto.prototype, "photo", void 0);
function validateImageFile(value) {
    console.log(value);
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
//# sourceMappingURL=update-employee.dto.js.map