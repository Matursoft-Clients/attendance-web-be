"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPositionModule = void 0;
const common_1 = require("@nestjs/common");
const job_position_service_1 = require("./job-position.service");
const job_position_controller_1 = require("./job-position.controller");
const nestjs_form_data_1 = require("nestjs-form-data");
const auth_middleware_1 = require("../middleware/auth.middleware");
let JobPositionModule = exports.JobPositionModule = class JobPositionModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'job-positions', method: common_1.RequestMethod.GET }, { path: 'job-positions', method: common_1.RequestMethod.POST }, { path: 'job-positions/:slug', method: common_1.RequestMethod.PATCH }, { path: 'job-positions/:slug', method: common_1.RequestMethod.DELETE });
    }
};
exports.JobPositionModule = JobPositionModule = __decorate([
    (0, common_1.Module)({
        controllers: [job_position_controller_1.JobPositionController],
        providers: [job_position_service_1.JobPositionService],
        imports: [
            nestjs_form_data_1.NestjsFormDataModule
        ],
    })
], JobPositionModule);
//# sourceMappingURL=job-position.module.js.map