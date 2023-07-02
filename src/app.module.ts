import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './helpers/tokenHelper/token.module';
import { GetCurrentUserModule } from './helpers/getCurrentUserHelper/getCurrentUser.module';
import { RequestContextModule } from 'nestjs-request-context';
import { SettingModule } from './setting/setting.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    TokenModule,
    GetCurrentUserModule,
    RequestContextModule,
    SettingModule,
  ],
})
export class AppModule { }
