import { IsInt, IsLatitude, IsLongitude, IsNotEmpty, IsString, Matches } from "class-validator";

export class UpdateSettingDto {
    @IsNotEmpty()
    @IsString()
    office_name: string;

    @IsNotEmpty()
    @IsString()
    office_logo: string;

    @IsNotEmpty()
    @Matches(/^(1[0-2]|0?[1-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,) // Format 00:00:00 
    presence_entry_start: string;

    @IsNotEmpty()
    @Matches(/^(1[0-2]|0?[1-9]):([0-5]?[0-9]):([0-5]?[0-9])$/) // Format 00:00:00
    presence_entry_end: string;

    @IsNotEmpty()
    @Matches(/^(1[0-2]|0?[1-9]):([0-5]?[0-9]):([0-5]?[0-9])$/) // Format 00:00:00
    presence_exit: string;

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
