import { DailyAttendanceService } from './daily-attendance.service';
import { Response } from 'express';
export declare class DailyAttendanceController {
    private readonly dailyAttendanceService;
    constructor(dailyAttendanceService: DailyAttendanceService);
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
}
