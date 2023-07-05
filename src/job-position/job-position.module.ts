import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JobPositionService } from './job-position.service';
import { JobPositionController } from './job-position.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
  controllers: [JobPositionController],
  providers: [JobPositionService],
  imports: [
    NestjsFormDataModule
  ],
})
export class JobPositionModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'job-positions', method: RequestMethod.GET },
        { path: 'job-positions', method: RequestMethod.POST },
        { path: 'job-positions/:slug', method: RequestMethod.PATCH },
        { path: 'job-positions/:slug', method: RequestMethod.DELETE },
      )
  }
}
