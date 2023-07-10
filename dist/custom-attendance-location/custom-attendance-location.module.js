"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAttendanceLocationModule = void 0;
const common_1 = require("@nestjs/common");
const custom_attendance_location_service_1 = require("./custom-attendance-location.service");
const custom_attendance_location_controller_1 = require("./custom-attendance-location.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const nestjs_form_data_1 = require("nestjs-form-data");
let CustomAttendanceLocationModule = exports.CustomAttendanceLocationModule = class CustomAttendanceLocationModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'custom-attendance-locations', method: common_1.RequestMethod.GET }, { path: 'custom-attendance-locations', method: common_1.RequestMethod.POST }, { path: 'custom-attendance-locations/:slug', method: common_1.RequestMethod.DELETE });
    }
};
exports.CustomAttendanceLocationModule = CustomAttendanceLocationModule = __decorate([
    (0, common_1.Module)({
        controllers: [custom_attendance_location_controller_1.CustomAttendanceLocationController],
        providers: [custom_attendance_location_service_1.CustomAttendanceLocationService],
        imports: [nestjs_form_data_1.NestjsFormDataModule]
    })
], CustomAttendanceLocationModule);
//# sourceMappingURL=custom-attendance-location.module.js.map