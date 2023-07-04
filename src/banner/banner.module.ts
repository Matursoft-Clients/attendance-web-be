import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  controllers: [BannerController],
  providers: [BannerService],
  imports: [
    NestjsFormDataModule
  ]
})
export class BannerModule { }
