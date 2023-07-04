import { FileTypeValidator, ParseFilePipe, UploadedFile } from "@nestjs/common";
import { IsInt, IsLatitude, IsLongitude, IsNotEmpty, IsString, Matches } from "class-validator";

export class UpdateSettingDto {
    @IsNotEmpty()
    @IsString()
    office_name: string;

    @IsNotEmpty()
    office_logo: any;

    @IsNotEmpty()
    presence_entry_start: Date;

    @IsNotEmpty()
    @Matches(/^(1[0-2]|0?[1-9]):([0-5]?[0-9]):([0-5]?[0-9])$/, { message: 'presence_entry_end must use time format' }) // Format 00:00:00
    presence_entry_end: Date;

    @IsNotEmpty()
    @Matches(/^(1[0-2]|0?[1-9]):([0-5]?[0-9]):([0-5]?[0-9])$/, { message: 'presence_exit must use time format' }) // Format 00:00:00
    presence_exit: Date;

    @IsNotEmpty()
    @IsString()
    presence_location_address: string;

    @IsNotEmpty()
    @IsLatitude()
    presence_location_latitude: number;

    @IsNotEmpty()
    @IsLongitude()
    presence_location_longitude: number;

    @IsNotEmpty()
    @IsInt()
    presence_meter_radius: number;
}
