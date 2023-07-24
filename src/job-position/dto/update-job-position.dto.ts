import { PartialType } from '@nestjs/swagger';
import { CreateJobPositionDto } from './create-job-position.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateJobPositionDto extends PartialType(CreateJobPositionDto) {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    @Length(3, 3)
    code?: string;
}
