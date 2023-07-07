import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [NestjsFormDataModule]
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'users/:uuid', method: RequestMethod.PATCH },
      )
  }
}

