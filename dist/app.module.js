"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const prisma_module_1 = require("./prisma/prisma.module");
const config_1 = require("@nestjs/config");
const token_module_1 = require("./helpers/tokenHelper/token.module");
const getCurrentUser_module_1 = require("./helpers/getCurrentUserHelper/getCurrentUser.module");
const nestjs_request_context_1 = require("nestjs-request-context");
const setting_module_1 = require("./setting/setting.module");
const banner_module_1 = require("./banner/banner.module");
const announcement_module_1 = require("./announcement/announcement.module");
const user_module_1 = require("./user/user.module");
const employee_module_1 = require("./employee/employee.module");
const job_position_module_1 = require("./job-position/job-position.module");
const custom_attendance_location_module_1 = require("./custom-attendance-location/custom-attendance-location.module");
const daily_attendance_module_1 = require("./daily-attendance/daily-attendance.module");
const calendar_module_1 = require("./calendar/calendar.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            prisma_module_1.PrismaModule,
            token_module_1.TokenModule,
            getCurrentUser_module_1.GetCurrentUserModule,
            nestjs_request_context_1.RequestContextModule,
            setting_module_1.SettingModule,
            banner_module_1.BannerModule,
            announcement_module_1.AnnouncementModule,
            user_module_1.UserModule,
            employee_module_1.EmployeeModule,
            job_position_module_1.JobPositionModule,
            custom_attendance_location_module_1.CustomAttendanceLocationModule,
            daily_attendance_module_1.DailyAttendanceModule,
            calendar_module_1.CalendarModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map