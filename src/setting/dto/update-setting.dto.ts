import { IsLatitude, IsLongitude, IsNotEmpty, IsNumberString, IsOptional, IsString, Matches, Validate } from "class-validator";
import { FileSystemStoredFile } from "nestjs-form-data";

// Custom validator untuk validasi file gambar
function validateImageFile(value: FileSystemStoredFile) {
    if (!value) {
        return true;
    }

    const validExtensions = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxFileSize = 1e6; // 1MB

    if (!validExtensions.includes(value.mimetype)) {
        return false;
    }

    if (value.size > maxFileSize) {
        return false;
    }

    return true;
}

export class UpdateSettingDto {
    @IsNotEmpty()
    @IsString()
    office_name: string;

    @IsOptional() // Mengizinkan field boleh kosong (null)
    @Validate(validateImageFile) // Validasi custom untuk file gambar
    office_logo?: FileSystemStoredFile; // Tambahkan tanda tanya (?) untuk mengindikasikan bahwa field boleh kosong

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
