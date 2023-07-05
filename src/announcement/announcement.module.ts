import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
  imports: [
    NestjsFormDataModule,
  ]
})
export class AnnouncementModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'announcements', method: RequestMethod.GET },
        { path: 'announcements', method: RequestMethod.POST },
        { path: 'announcements/:slug', method: RequestMethod.GET },
        { path: 'announcements/:slug', method: RequestMethod.PATCH },
        { path: 'announcements/:slug', method: RequestMethod.DELETE },
      )
  }
}

