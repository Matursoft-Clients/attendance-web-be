import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  controllers: [SettingController],
  providers: [SettingService],
  imports: [
    NestjsFormDataModule
  ]
})
export class SettingModule { }
