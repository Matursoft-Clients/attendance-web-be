import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
  controllers: [BranchController],
  providers: [BranchService],
  imports: [NestjsFormDataModule]
})
export class BranchModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'branches', method: RequestMethod.GET },
        { path: 'branches/get-city/:name', method: RequestMethod.GET },
        { path: 'branches', method: RequestMethod.POST },
        { path: 'branches/:uuid', method: RequestMethod.PATCH },
        { path: 'branches/:uuid', method: RequestMethod.DELETE },
      )
  }
}
