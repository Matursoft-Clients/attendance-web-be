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
exports.CustomAttendanceLocationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
let CustomAttendanceLocationService = exports.CustomAttendanceLocationService = class CustomAttendanceLocationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCustomAttendanceLocationDto) {
        const employee = await this.findEmployeeByUuid(createCustomAttendanceLocationDto.employee_uuid);
        if (!employee) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: 'Custom attendance location failed to create! No Employee found.',
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        try {
            const createCustomAttendanceLocation = await this.prisma.cUSTOM_ATTENDANCE_LOCATIONS.create({
                data: {
                    uuid: (0, uuid_1.v4)(),
                    employee_uuid: createCustomAttendanceLocationDto.employee_uuid,
                    start_date: new Date(createCustomAttendanceLocationDto.start_date),
                    end_date: new Date(createCustomAttendanceLocationDto.end_date),
                    presence_location_address: createCustomAttendanceLocationDto.presence_location_address,
                    presence_location_latitude: +createCustomAttendanceLocationDto.presence_location_latitude,
                    presence_location_longitude: +createCustomAttendanceLocationDto.presence_location_longitude,
                    created_at: new Date(),
                    updated_at: new Date()
                },
            });
            return createCustomAttendanceLocation;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: "Error! Please Contact Admin.",
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    async findAll() {
        let customAttendanceLocationsExtendEmployee = [];
        const customAttendanceLocations = await this.prisma.cUSTOM_ATTENDANCE_LOCATIONS.findMany();
        for (let i = 0; i < customAttendanceLocations.length; i++) {
            customAttendanceLocationsExtendEmployee[i] = customAttendanceLocations[i];
            customAttendanceLocationsExtendEmployee[i].employee = await this.findEmployeeByUuid(customAttendanceLocations[i].employee_uuid);
            delete customAttendanceLocationsExtendEmployee[i].employee['password'];
            customAttendanceLocationsExtendEmployee[i].employee['photo'] = 'apa';
        }
        return customAttendanceLocationsExtendEmployee;
    }
    async findOne(uuid) {
        return await this.prisma.cUSTOM_ATTENDANCE_LOCATIONS.findFirst({ where: { uuid } });
    }
    async findEmployeeByUuid(uuid) {
        return await this.prisma.eMPLOYEES.findFirst({ where: { uuid } });
    }
    async remove(uuid) {
        const customAttendanceLocation = await this.findOne(uuid);
        if (!customAttendanceLocation) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: 'Custom attendance location failed to delete! Record not found.',
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return await this.prisma.cUSTOM_ATTENDANCE_LOCATIONS.delete({
            where: { uuid }
        });
    }
};
exports.CustomAttendanceLocationService = CustomAttendanceLocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomAttendanceLocationService);
//# sourceMappingURL=custom-attendance-location.service.js.map