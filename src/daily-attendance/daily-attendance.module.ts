import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { DailyAttendanceService } from './daily-attendance.service';
import { DailyAttendanceController } from './daily-attendance.controller';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
  controllers: [DailyAttendanceController],
  providers: [DailyAttendanceService]
})
export class DailyAttendanceModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'daily-attendances', method: RequestMethod.GET },
      )
  }
}
