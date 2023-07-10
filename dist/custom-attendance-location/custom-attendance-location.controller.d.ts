import { CustomAttendanceLocationService } from './custom-attendance-location.service';
import { CreateCustomAttendanceLocationDto } from './dto';
import { Response } from 'express';
export declare class CustomAttendanceLocationController {
    private readonly customAttendanceLocationService;
    constructor(customAttendanceLocationService: CustomAttendanceLocationService);
    create(createCustomAttendanceLocationDto: CreateCustomAttendanceLocationDto, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    remove(uuid: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
