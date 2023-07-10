"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyAttendanceModule = void 0;
const common_1 = require("@nestjs/common");
const daily_attendance_service_1 = require("./daily-attendance.service");
const daily_attendance_controller_1 = require("./daily-attendance.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
let DailyAttendanceModule = exports.DailyAttendanceModule = class DailyAttendanceModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'daily-attendances', method: common_1.RequestMethod.GET });
    }
};
exports.DailyAttendanceModule = DailyAttendanceModule = __decorate([
    (0, common_1.Module)({
        controllers: [daily_attendance_controller_1.DailyAttendanceController],
        providers: [daily_attendance_service_1.DailyAttendanceService]
    })
], DailyAttendanceModule);
//# sourceMappingURL=daily-attendance.module.js.map