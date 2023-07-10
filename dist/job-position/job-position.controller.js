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
exports.JobPositionController = void 0;
const common_1 = require("@nestjs/common");
const job_position_service_1 = require("./job-position.service");
const nestjs_form_data_1 = require("nestjs-form-data");
const dto_1 = require("./dto");
let JobPositionController = exports.JobPositionController = class JobPositionController {
    constructor(jobPositionService) {
        this.jobPositionService = jobPositionService;
    }
    async create(createJobPositionDto, res) {
        const createdJobPosition = await this.jobPositionService.create(createJobPositionDto);
        return res.status(200).json({
            code: 200,
            msg: `Job Position ${createdJobPosition.name} has been created successfully`,
        });
    }
    async findAll(res) {
        const jobPositions = await this.jobPositionService.findAll();
        return res.status(200).json({
            code: 200,
            msg: 'Here is Your Job Positions',
            data: {
                jobPositions
            },
        });
    }
    async update(uuid, updateJobPositionDto, res) {
        const updatedJobPosition = await this.jobPositionService.update(uuid, updateJobPositionDto);
        return res.status(200).json({
            code: 200,
            msg: `Job Position ${updatedJobPosition.name} has been updated successfully`,
        });
    }
    async remove(uuid, res) {
        const jobPosition = await this.jobPositionService.remove(uuid);
        return res.status(200).json({
            code: 200,
            msg: 'Job Position ' + jobPosition.name + ' has been Deleted'
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, nestjs_form_data_1.FormDataRequest)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateJobPositionDto, Object]),
    __metadata("design:returntype", Promise)
], JobPositionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobPositionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':uuid'),
    (0, nestjs_form_data_1.FormDataRequest)(),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateJobPositionDto, Object]),
    __metadata("design:returntype", Promise)
], JobPositionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':uuid'),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], JobPositionController.prototype, "remove", null);
exports.JobPositionController = JobPositionController = __decorate([
    (0, common_1.Controller)('job-positions'),
    __metadata("design:paramtypes", [job_position_service_1.JobPositionService])
], JobPositionController);
//# sourceMappingURL=job-position.controller.js.map