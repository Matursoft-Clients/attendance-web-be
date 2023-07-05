import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CustomAttendanceLocationService } from './custom-attendance-location.service';
import { CustomAttendanceLocationController } from './custom-attendance-location.controller';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  controllers: [CustomAttendanceLocationController],
  providers: [CustomAttendanceLocationService],
  imports: [NestjsFormDataModule]
})
export class CustomAttendanceLocationModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'custom-attendance-locations', method: RequestMethod.GET },
        { path: 'custom-attendance-locations', method: RequestMethod.POST },
        { path: 'custom-attendance-locations/:slug', method: RequestMethod.DELETE },
      )
  }
}
