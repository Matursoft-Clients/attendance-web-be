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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const nestjs_form_data_1 = require("nestjs-form-data");
const path_1 = require("path");
const config_1 = require("../config");
const fs_1 = require("fs");
const randomstring = require("randomstring");
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async update(uuid, updateUserDto, res) {
        const photo = updateUserDto.photo;
        const UpdatedUser = await this.userService.update(uuid, updateUserDto);
        if (photo) {
            const fileExtension = photo.originalName.split('.').pop();
            const fileName = randomstring.generate(10) + '.' + fileExtension;
            const filePath = (0, path_1.join)(config_1.FILE_PATH, 'user', fileName);
            (0, fs_1.copyFileSync)(photo.path, filePath);
            const user = await this.userService.findOne(uuid);
            if (user && user.photo) {
                const oldFilePath = (0, path_1.join)(config_1.FILE_PATH, 'user', user.photo);
                (0, fs_1.unlink)(oldFilePath, (err) => {
                    if (err) {
                        console.error('Gagal menghapus foto lama:', err);
                    }
                    else {
                        console.log('Foto lama berhasil dihapus');
                    }
                });
            }
            await this.userService.updateUserPhoto(uuid, fileName);
        }
        return res.status(200).json({
            code: 200,
            msg: `User ${UpdatedUser.name} successfully updated`,
        });
    }
};
__decorate([
    (0, common_1.Patch)(':uuid'),
    (0, nestjs_form_data_1.FormDataRequest)({ storage: nestjs_form_data_1.FileSystemStoredFile }),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map