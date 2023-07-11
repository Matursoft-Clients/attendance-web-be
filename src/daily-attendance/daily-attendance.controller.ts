import { Controller, Get, Query, Res } from '@nestjs/common';
import { DailyAttendanceService } from './daily-attendance.service';
import { Response } from 'express';
import { ParamDailyAttendanceDto } from './dto';

@Controller('daily-attendances')
export class DailyAttendanceController {
  constructor(private readonly dailyAttendanceService: DailyAttendanceService) { }

  @Get()
  async findAll(@Query() { status, start_date, end_date }: ParamDailyAttendanceDto, @Res() res: Response) {
    const dailyAttendances = await this.dailyAttendanceService.findAll(status, start_date, end_date);

    return res.status(200).json({
      code: 200,
      msg: 'Daily attendances',
      data: {
        dailyAttendances
      },
    });
  }
}
