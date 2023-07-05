import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DailyAttendanceService {

  constructor(private prisma: PrismaService) { }


  async findAll() {

    let dailyAttendancesExtendEmployee = [];
    const dailyAttendances = await this.prisma.dAILY_ATTENDANCES.findMany()

    for (let i = 0; i < dailyAttendances.length; i++) {
      dailyAttendancesExtendEmployee[i] = dailyAttendances[i];
      dailyAttendancesExtendEmployee[i].employee = await this.findEmployeeByUuid(dailyAttendances[i].employee_uuid)
    }

    return dailyAttendancesExtendEmployee

  }

  async findEmployeeByUuid(uuid: string) {
    return await this.prisma.eMPLOYEES.findFirst({ where: { uuid } })
  }
}
