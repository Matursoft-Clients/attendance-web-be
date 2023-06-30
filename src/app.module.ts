import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './helpers/tokenHelper/token.module';
import { GetCurrentUserModule } from './helpers/getCurrentUserHelper/getCurrentUser.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    EmployeeModule,
    PrismaModule,
    TokenModule,
    GetCurrentUserModule,
  ],
})
export class AppModule { }
