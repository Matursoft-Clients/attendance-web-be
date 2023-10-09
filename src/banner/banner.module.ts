import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AuthMiddleware } from 'src/middleware';

@Module({
  controllers: [BannerController],
  providers: [BannerService],
  imports: [NestjsFormDataModule]
})
export class BannerModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'banners', method: RequestMethod.GET },
        { path: 'banners', method: RequestMethod.POST },
        { path: 'banners/:slug', method: RequestMethod.DELETE },
      )
  }
}
