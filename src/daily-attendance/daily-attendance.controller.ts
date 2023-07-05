import { Controller, Get, Res } from '@nestjs/common';
import { DailyAttendanceService } from './daily-attendance.service';
import { Response } from 'express';

@Controller('daily-attendances')
export class DailyAttendanceController {
  constructor(private readonly dailyAttendanceService: DailyAttendanceService) { }

  @Get()
  async findAll(@Res() res: Response) {
    const dailyAttendances = await this.dailyAttendanceService.findAll();

    return res.status(200).json({
      code: 200,
      msg: 'Daily attendances',
      data: {
        dailyAttendances
      },
    });
  }
}
