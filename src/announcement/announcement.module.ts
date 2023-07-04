import { Module } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
  imports: [
    NestjsFormDataModule
  ]
})
export class AnnouncementModule { }
