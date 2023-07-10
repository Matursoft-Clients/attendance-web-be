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
exports.JobPositionService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const prisma_service_1 = require("../prisma/prisma.service");
let JobPositionService = exports.JobPositionService = class JobPositionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createJobPositionDto) {
        try {
            const createJobPosition = await this.prisma.jOB_POSITIONS.create({
                data: {
                    uuid: (0, uuid_1.v4)(),
                    name: createJobPositionDto.name,
                    code: createJobPositionDto.code,
                    created_at: new Date(),
                    updated_at: new Date()
                },
            });
            return createJobPosition;
        }
        catch (error) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: "Error! Please Contact Admin.",
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    async findAll() {
        return await this.prisma.jOB_POSITIONS.findMany();
    }
    async findOne(uuid) {
        return await this.prisma.jOB_POSITIONS.findUnique({ where: { uuid } });
    }
    async findJobPositionInEmployee(job_position_uuid) {
        return await this.prisma.eMPLOYEES.findFirst({ where: { job_position_uuid } });
    }
    async update(uuid, updateJobPositionDto) {
        const jobPosition = await this.findOne(uuid);
        if (!jobPosition) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: 'Job Position failed to update!',
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return await this.prisma.jOB_POSITIONS.update({
            where: {
                uuid
            },
            data: {
                name: updateJobPositionDto.name,
                code: updateJobPositionDto.code,
                updated_at: new Date()
            }
        });
    }
    async remove(uuid) {
        const jobPosition = await this.findOne(uuid);
        if (!jobPosition) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: 'Job Position failed to delete! Record not found.',
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const jobPositionInEmployee = await this.findJobPositionInEmployee(uuid);
        if (jobPositionInEmployee) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: 'Job Position failed to delete! Record use in Employee.',
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return await this.prisma.jOB_POSITIONS.delete({
            where: { uuid }
        });
    }
};
exports.JobPositionService = JobPositionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JobPositionService);
//# sourceMappingURL=job-position.service.js.map