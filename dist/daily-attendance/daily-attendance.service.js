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
exports.DailyAttendanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DailyAttendanceService = exports.DailyAttendanceService = class DailyAttendanceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(status, start_date, end_date) {
        console.log(start_date);
        try {
            let dailyAttendances = [];
            if (status === 'today') {
                dailyAttendances = await this.prisma.$queryRaw `SELECT *
        FROM
          DAILY_ATTENDANCES
        WHERE DATE_FORMAT(DAILY_ATTENDANCES.date, '%Y-%m-%d') = CURDATE()`;
            }
            if (status === 'date_range') {
                if (!start_date || !end_date) {
                    throw new common_1.HttpException({
                        code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                        msg: 'Param start date and end date is required!',
                    }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
                }
                if (start_date > end_date) {
                    throw new common_1.HttpException({
                        code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                        msg: 'Param start date must be lower date of end date!',
                    }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
                }
                dailyAttendances = await this.prisma.$queryRaw `SELECT *
        FROM
          DAILY_ATTENDANCES
        WHERE DATE_FORMAT(DAILY_ATTENDANCES.date, '%Y-%m-%d') BETWEEN ${start_date} AND ${end_date}`;
            }
            let dailyAttendancesExtendEmployee = [];
            for (let i = 0; i < dailyAttendances.length; i++) {
                dailyAttendancesExtendEmployee[i] = dailyAttendances[i];
                dailyAttendancesExtendEmployee[i].employee = await this.findEmployeeByUuid(dailyAttendances[i].employee_uuid);
            }
            return dailyAttendancesExtendEmployee;
        }
        catch (err) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                msg: err,
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    async findEmployeeByUuid(uuid) {
        const employee = await this.prisma.eMPLOYEES.findFirst({ where: { uuid } });
        delete employee['password'];
        delete employee['token'];
        return employee;
    }
};
exports.DailyAttendanceService = DailyAttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DailyAttendanceService);
//# sourceMappingURL=daily-attendance.service.js.map