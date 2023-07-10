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
    async findAll() {
        let dailyAttendancesExtendEmployee = [];
        const dailyAttendances = await this.prisma.dAILY_ATTENDANCES.findMany();
        for (let i = 0; i < dailyAttendances.length; i++) {
            dailyAttendancesExtendEmployee[i] = dailyAttendances[i];
            dailyAttendancesExtendEmployee[i].employee = await this.findEmployeeByUuid(dailyAttendances[i].employee_uuid);
        }
        return dailyAttendancesExtendEmployee;
    }
    async findEmployeeByUuid(uuid) {
        return await this.prisma.eMPLOYEES.findFirst({ where: { uuid } });
    }
};
exports.DailyAttendanceService = DailyAttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DailyAttendanceService);
//# sourceMappingURL=daily-attendance.service.js.map