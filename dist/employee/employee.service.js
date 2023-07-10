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
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
const config_1 = require("../config");
const bcrypt = require("bcrypt");
let EmployeeService = exports.EmployeeService = class EmployeeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createEmployeeDto, photoFileName) {
        const employee = await this.findEmployeeByEmail(createEmployeeDto.email);
        if (employee) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: 'Employee failed to create! Email already in use.',
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const jobPosition = await this.findJobPositionByUuid(createEmployeeDto.job_position_uuid);
        if (!jobPosition) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: 'Employee failed to create! Job Position not found.',
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        try {
            const createEmployee = await this.prisma.eMPLOYEES.create({
                data: {
                    uuid: (0, uuid_1.v4)(),
                    name: createEmployeeDto.name,
                    job_position_uuid: createEmployeeDto.job_position_uuid,
                    email: createEmployeeDto.email,
                    password: await bcrypt.hash(createEmployeeDto.password, 10),
                    photo: photoFileName,
                    created_at: new Date(),
                    updated_at: new Date()
                },
            });
            return createEmployee;
        }
        catch (error) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: "Error! Please Contact Admin.",
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    async findAll() {
        const employees = await this.prisma.eMPLOYEES.findMany();
        employees.map((e) => {
            delete e.password;
            e.photo ? e.photo = config_1.WEB_URL + 'employee/' + e.photo : null;
        });
        return employees;
    }
    async findOne(uuid) {
        return await this.prisma.eMPLOYEES.findUnique({ where: { uuid } });
    }
    async findEmployeeByEmail(email) {
        return await this.prisma.eMPLOYEES.findUnique({ where: { email } });
    }
    async findJobPositionByUuid(uuid) {
        return await this.prisma.jOB_POSITIONS.findUnique({ where: { uuid } });
    }
    async update(uuid, updateEmployeeDto) {
        const employeeInUpdate = await this.findOne(uuid);
        if (!employeeInUpdate) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: 'Employee failed to update! Record not found.',
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (updateEmployeeDto.password) {
            if (!('password_confirmation' in updateEmployeeDto)) {
                throw new common_1.HttpException({
                    code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    msg: 'Password confirmation is required.',
                }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
        }
        const employee = await this.findEmployeeByEmail(updateEmployeeDto.email);
        if (employee) {
            if (updateEmployeeDto.email == employee.email && employeeInUpdate.email !== updateEmployeeDto.email) {
                throw new common_1.HttpException({
                    code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    msg: 'Employee failed to update! Email already in use.',
                }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
        }
        const jobPosition = await this.findJobPositionByUuid(updateEmployeeDto.job_position_uuid);
        if (!jobPosition) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: 'Employee failed to update! Job Position not found.',
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        try {
            const updateEmployee = await this.prisma.eMPLOYEES.update({
                where: { uuid },
                data: {
                    name: updateEmployeeDto.name,
                    job_position_uuid: updateEmployeeDto.job_position_uuid,
                    email: updateEmployeeDto.email,
                    password: updateEmployeeDto.password ? await bcrypt.hash(updateEmployeeDto.password, 10) : employeeInUpdate.password,
                    updated_at: new Date()
                },
            });
            return updateEmployee;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: "Error! Please Contact Admin.",
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    async updateEmployeePhoto(uuid, photoFileName) {
        try {
            await this.prisma.eMPLOYEES.update({
                where: { uuid },
                data: {
                    photo: photoFileName,
                },
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
    async remove(uuid) {
        const employee = await this.findOne(uuid);
        if (!employee) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: 'Employee failed to delete! Record not found.',
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return await this.prisma.eMPLOYEES.delete({ where: { uuid } });
    }
};
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map