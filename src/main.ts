import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public',
  });

  await app.listen(8002);

  // Route List
  // const server = app.getHttpServer();
  // const router = server._events.request._router;
  // const availableRoutes: [] = router.stack
  //   .map(layer => {
  //     if (layer.route) {
  //       return {
  //         route: {
  //           path: layer.route?.path,
  //           method: layer.route?.stack[0].method,
  //         },
  //       };
  //     }
  //   })
  //   .filter(item => item !== undefined);

  // console.log(availableRoutes);
}
bootstrap();
