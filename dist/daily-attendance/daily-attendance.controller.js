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
exports.DailyAttendanceController = void 0;
const common_1 = require("@nestjs/common");
const daily_attendance_service_1 = require("./daily-attendance.service");
const dto_1 = require("./dto");
let DailyAttendanceController = exports.DailyAttendanceController = class DailyAttendanceController {
    constructor(dailyAttendanceService) {
        this.dailyAttendanceService = dailyAttendanceService;
    }
    async findAll({ status, start_date, end_date }, res) {
        const dailyAttendances = await this.dailyAttendanceService.findAll(status, start_date, end_date);
        return res.status(200).json({
            code: 200,
            msg: 'Daily attendances',
            data: {
                dailyAttendances
            },
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ParamDailyAttendanceDto, Object]),
    __metadata("design:returntype", Promise)
], DailyAttendanceController.prototype, "findAll", null);
exports.DailyAttendanceController = DailyAttendanceController = __decorate([
    (0, common_1.Controller)('daily-attendances'),
    __metadata("design:paramtypes", [daily_attendance_service_1.DailyAttendanceService])
], DailyAttendanceController);
//# sourceMappingURL=daily-attendance.controller.js.map