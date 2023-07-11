import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { EmployeeService } from 'src/employee/employee.service';

@Module({
  controllers: [CalendarController],
  providers: [CalendarService, EmployeeService]
})
export class CalendarModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'calendar', method: RequestMethod.PATCH },
      )
  }
}
