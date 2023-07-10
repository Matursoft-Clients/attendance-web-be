import { FileSystemStoredFile } from "nestjs-form-data";
export declare class UpdateSettingDto {
    office_name: string;
    office_logo?: FileSystemStoredFile;
    presence_entry_start: string;
    presence_entry_end: string;
    presence_exit: string;
    presence_location_address: string;
    presence_location_latitude: number;
    presence_location_longitude: number;
    presence_meter_radius: number;
}
