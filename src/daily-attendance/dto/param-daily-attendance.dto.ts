import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export enum StatusEnum {
    Today = 'today',
    DateRange = 'date_range',
}

export class ParamDailyAttendanceDto {
    @IsNotEmpty({ message: 'status is required' })
    @IsEnum(StatusEnum, { message: 'status must be either "today" or "date_range"' })
    status: StatusEnum;

    @IsOptional()
    @IsDateString({ strict: true }, { message: 'start_date must be a valid date in the format "YYYY-MM-DD"' })
    start_date?: string;

    @IsOptional()
    @IsDateString({ strict: true }, { message: 'end_date must be a valid date in the format "YYYY-MM-DD"' })
    end_date?: string;
}
