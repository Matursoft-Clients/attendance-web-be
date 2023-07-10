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
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("./employee.service");
const dto_1 = require("./dto");
const nestjs_form_data_1 = require("nestjs-form-data");
const randomstring = require("randomstring");
const path_1 = require("path");
const fs_1 = require("fs");
const config_1 = require("../config");
let EmployeeController = exports.EmployeeController = class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async create(createEmployeeDto, res) {
        const photo = createEmployeeDto.photo;
        const fileExtension = photo.originalName.split('.').pop();
        const fileName = randomstring.generate(10) + '.' + fileExtension;
        const filePath = (0, path_1.join)(config_1.FILE_PATH, 'employee', fileName);
        (0, fs_1.copyFileSync)(photo.path, filePath);
        const createdEmployee = await this.employeeService.create(createEmployeeDto, fileName);
        return res.status(200).json({
            code: 200,
            msg: `Employee ${createdEmployee.name} has been successfully created.`,
        });
    }
    async findAll(res) {
        const employees = await this.employeeService.findAll();
        return res.status(200).json({
            code: 200,
            msg: 'Here is Your Employees',
            data: {
                employees
            },
        });
    }
    async update(uuid, updateEmployeeDto, res) {
        const photo = updateEmployeeDto.photo;
        const UpdatedEmployee = await this.employeeService.update(uuid, updateEmployeeDto);
        if (photo) {
            const fileExtension = photo.originalName.split('.').pop();
            const fileName = randomstring.generate(10) + '.' + fileExtension;
            const filePath = (0, path_1.join)(config_1.FILE_PATH, 'employee', fileName);
            (0, fs_1.copyFileSync)(photo.path, filePath);
            const employee = await this.employeeService.findOne(uuid);
            if (employee && employee.photo) {
                const oldFilePath = (0, path_1.join)(config_1.FILE_PATH, 'employee', employee.photo);
                (0, fs_1.unlink)(oldFilePath, (err) => {
                    if (err) {
                        console.error('Gagal menghapus foto lama:', err);
                    }
                    else {
                        console.log('Foto lama berhasil dihapus');
                    }
                });
            }
            await this.employeeService.updateEmployeePhoto(uuid, fileName);
        }
        return res.status(200).json({
            code: 200,
            msg: `Employee ${UpdatedEmployee.name} successfully updated`,
        });
    }
    async updateEmployeePhoto(uuid, updateEmployeePhotoDTO) {
        const photo = updateEmployeePhotoDTO.photo;
        const fileExtension = photo.originalName.split('.').pop();
        const fileName = randomstring.generate(10) + '.' + fileExtension;
        const filePath = (0, path_1.join)(config_1.FILE_PATH, 'employee', fileName);
        (0, fs_1.copyFileSync)(photo.path, filePath);
        const employee = await this.employeeService.findOne(uuid);
        if (employee && employee.photo) {
            const oldFilePath = (0, path_1.join)(config_1.FILE_PATH, 'employee', employee.photo);
            (0, fs_1.unlink)(oldFilePath, (err) => {
                if (err) {
                    console.error('Gagal menghapus foto lama:', err);
                }
                else {
                    console.log('Foto lama berhasil dihapus');
                }
            });
        }
        return fileName;
    }
    async remove(uuid, res) {
        const employee = await this.employeeService.remove(uuid);
        const oldFilePath = (0, path_1.join)(config_1.FILE_PATH, 'employee', employee.photo);
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
            msg: 'Employee ' + employee.name + ' has been deleted.'
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, nestjs_form_data_1.FormDataRequest)({ storage: nestjs_form_data_1.FileSystemStoredFile }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateEmployeeDto, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':uuid'),
    (0, nestjs_form_data_1.FormDataRequest)({ storage: nestjs_form_data_1.FileSystemStoredFile }),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateEmployeeDto, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':uuid'),
    (0, nestjs_form_data_1.FormDataRequest)({ storage: nestjs_form_data_1.FileSystemStoredFile }),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateEmployeePhotoDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "updateEmployeePhoto", null);
__decorate([
    (0, common_1.Delete)(':uuid'),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "remove", null);
exports.EmployeeController = EmployeeController = __decorate([
    (0, common_1.Controller)('employees'),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeeController);
//# sourceMappingURL=employee.controller.js.map