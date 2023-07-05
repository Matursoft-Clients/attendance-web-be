import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateAnnouncementDto } from './create-announcement.dto';

export class UpdateAnnouncementDto extends PartialType(CreateAnnouncementDto) {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    content?: string;
}
