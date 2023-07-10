import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmployeeService } from 'src/employee/employee.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CalendarService {

  constructor(private prisma: PrismaService, private readonly employeeService: EmployeeService) { }

  async getCalendar(date: string, employee_uuid: string) {

    const employee = await this.employeeService.findOne(employee_uuid);

    if (!employee) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Employee not found!',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    try {
      const calendars: [] = await this.prisma.$queryRaw
        `SELECT 
          DATE_FORMAT(DAILY_ATTENDANCES.date, '%d') as date,
          DAILY_ATTENDANCES.presence_entry_status,
          DAILY_ATTENDANCES.presence_entry_hour,
          DAILY_ATTENDANCES.presence_exit_status,
          DAILY_ATTENDANCES.presence_exit_hour
        FROM DAILY_ATTENDANCES
          WHERE DAILY_ATTENDANCES.employee_uuid = ${employee_uuid}
            AND DATE_FORMAT(DAILY_ATTENDANCES.date, '%Y-%m') = ${date}`

      return calendars

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
}
