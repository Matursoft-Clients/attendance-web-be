import { Controller, Get, Query, Res } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { GetCalendarDto } from './dto';
import { Response } from 'express';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) { }

  @Get()
  async getCalendar(@Query() { date, employee_uuid }: GetCalendarDto, @Res() res: Response) {

    const calendars = await this.calendarService.getCalendar(date, employee_uuid);


    const [year, month] = date.split('-');

    const yearNumber = parseInt(year, 10);
    const monthNumber = parseInt(month, 10);

    const startDate = new Date(yearNumber, monthNumber - 1, 1);
    const endDate = new Date(yearNumber, monthNumber, 0);

    // Get date in month
    const dailyDataPresences = [];
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      let dayDate = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate().toString()
      let absen: any = calendars.filter((e: any) => {
        return e.date == dayDate
      })

      dailyDataPresences.push({
        day: dayDate,
        absen: absen.length == 0 ? null : absen[0]
      });
    }

    return res.status(200).json({
      code: 200,
      msg: `Here is Calendar`,
      data: dailyDataPresences
    });
  }
}
