import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  imports: [NestjsFormDataModule]
})
export class EmployeeModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'employees', method: RequestMethod.GET },
        { path: 'employees', method: RequestMethod.POST },
        { path: 'employees/import', method: RequestMethod.POST },
        { path: 'employees/:uuid', method: RequestMethod.POST },
        { path: 'employees/refresh-device/:uuid', method: RequestMethod.PATCH },
        { path: 'employees/:uuid', method: RequestMethod.PATCH },
        { path: 'employees/:uuid', method: RequestMethod.DELETE },
      )
  }
}
