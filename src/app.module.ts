import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './helpers/tokenHelper/token.module';
import { GetCurrentUserModule } from './helpers/getCurrentUserHelper/getCurrentUser.module';
import { RequestContextModule } from 'nestjs-request-context';
import { SettingModule } from './setting/setting.module';
import { BannerModule } from './banner/banner.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';
import { JobPositionModule } from './job-position/job-position.module';
import { CustomAttendanceLocationModule } from './custom-attendance-location/custom-attendance-location.module';
import { DailyAttendanceModule } from './daily-attendance/daily-attendance.module';
import { CalendarModule } from './calendar/calendar.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    TokenModule,
    GetCurrentUserModule,
    RequestContextModule,
    SettingModule,
    BannerModule,
    AnnouncementModule,
    UserModule,
    EmployeeModule,
    JobPositionModule,
    CustomAttendanceLocationModule,
    DailyAttendanceModule,
    CalendarModule,
  ],
})
export class AppModule { }
