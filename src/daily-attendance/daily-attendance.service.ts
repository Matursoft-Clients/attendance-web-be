import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DailyAttendanceService {

  constructor(private prisma: PrismaService) { }

  async findAll(status: string, start_date: string, end_date: string) {

    try {
      let dailyAttendances = []
      if (status === 'today') {
        dailyAttendances = await this.prisma.$queryRaw
          `SELECT *
        FROM
          DAILY_ATTENDANCES
        WHERE DATE_FORMAT(DAILY_ATTENDANCES.date, '%Y-%m-%d') = CURDATE()`
      }

      if (status === 'date_range') {
        if (!start_date || !end_date) {
          throw new HttpException(
            {
              code: HttpStatus.UNPROCESSABLE_ENTITY,
              msg: 'Param start date and end date is required!',
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        if (start_date > end_date) {
          throw new HttpException(
            {
              code: HttpStatus.UNPROCESSABLE_ENTITY,
              msg: 'Param start date must be lower date of end date!',
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        dailyAttendances = await this.prisma.$queryRaw
          `SELECT *
        FROM
          DAILY_ATTENDANCES
        WHERE DATE_FORMAT(DAILY_ATTENDANCES.date, '%Y-%m-%d') BETWEEN ${start_date} AND ${end_date}`
      }

      let dailyAttendancesExtendEmployee = [];
      for (let i = 0; i < dailyAttendances.length; i++) {
        dailyAttendancesExtendEmployee[i] = dailyAttendances[i];
        dailyAttendancesExtendEmployee[i].employee = await this.findEmployeeByUuid(dailyAttendances[i].employee_uuid)
      }

      return dailyAttendancesExtendEmployee
    } catch (err) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: err,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async findEmployeeByUuid(uuid: string) {
    const employee = await this.prisma.eMPLOYEES.findFirst({ where: { uuid } })

    delete employee['password']
    delete employee['token']

    return employee
  }
}
