import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
  controllers: [SettingController],
  providers: [SettingService],
  imports: [
    NestjsFormDataModule
  ]
})
export class SettingModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'settings/:uuid', method: RequestMethod.PATCH },
      )
  }
}