import { Controller, Get, Query, Res } from '@nestjs/common';
import { DailyAttendanceService } from './daily-attendance.service';
import { Response } from 'express';
import { ParamDailyAttendanceDto, ParamDailyAttendancePublicDto } from './dto';
import { KEY } from 'src/config';

@Controller('daily-attendances')
export class DailyAttendanceController {

  constructor(private readonly dailyAttendanceService: DailyAttendanceService) { }

  @Get()
  async findAll(@Query() { status, start_date, end_date }: ParamDailyAttendanceDto, @Res() res: Response) {
    const dailyAttendances = await this.dailyAttendanceService.findAll(status, start_date, end_date);

    return res.status(200).json({
      code: 200,
      msg: 'Daily attendances',
      data: { dailyAttendances },
    });
  }

  @Get('public')
  async findAllPublic(@Query() { key, status, start_date, end_date }: ParamDailyAttendancePublicDto, @Res() res: Response) {
    console.log(key)

    if (key !== KEY) {
      return res.status(422).json({
        code: 422,
        msg: 'Key is wrong!',
      });
    }

    const dailyAttendances = await this.dailyAttendanceService.findAll(status, start_date, end_date);

    return res.status(200).json({
      code: 200,
      msg: 'Daily attendances',
      data: { dailyAttendances },
    });
  }
}
