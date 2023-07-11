import { DailyAttendanceService } from './daily-attendance.service';
import { Response } from 'express';
import { ParamDailyAttendanceDto } from './dto';
export declare class DailyAttendanceController {
    private readonly dailyAttendanceService;
    constructor(dailyAttendanceService: DailyAttendanceService);
    findAll({ status, start_date, end_date }: ParamDailyAttendanceDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
