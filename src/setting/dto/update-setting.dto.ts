import { IsLatitude, IsLongitude, IsNotEmpty, IsNumberString, IsString, Matches } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from "nestjs-form-data";

export class UpdateSettingDto {
    @IsNotEmpty()
    @IsString()
    office_name: string;

    @IsFile()
    @MaxFileSize(1e6)
    @HasMimeType(['image/jpeg', 'image/png', 'image/jpg'])
    office_logo: FileSystemStoredFile;

    @IsNotEmpty()
    @Matches(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, { message: 'presence_entry_start must use format hhhh:mm:ss' }) // Format 00:00:00
    presence_entry_start: string;

    @IsNotEmpty()
    @Matches(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, { message: 'presence_entry_end must use format hhhh:mm:ss' }) // Format 00:00:00
    presence_entry_end: string;

    @IsNotEmpty()
    @Matches(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, { message: 'presence_exit must use format hhhh:mm:ss' }) // Format 00:00:00
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
    @IsNumberString({}, { message: 'presence_meter_radius must be a number' })
    presence_meter_radius: number;
}
