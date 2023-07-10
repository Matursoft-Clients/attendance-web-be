import { Response } from "express";
import { SettingService } from './setting.service';
import { UpdateSettingDto } from './dto';
export declare class SettingController {
    private readonly settingService;
    constructor(settingService: SettingService);
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    update(uuid: string, updateSettingDto: UpdateSettingDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
