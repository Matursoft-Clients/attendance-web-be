import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, Validate } from 'class-validator';
import { CreateAnnouncementDto } from './create-announcement.dto';
import { FileSystemStoredFile } from 'nestjs-form-data';

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

export class UpdateAnnouncementDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsOptional() // Mengizinkan field boleh kosong (null)
    @Validate(validateImageFile) // Validasi custom untuk file gambar
    thumbnail?: FileSystemStoredFile; // Tambahkan tanda tanya (?) untuk mengindikasikan bahwa field boleh kosong

    @IsString()
    @IsOptional()
    content?: string;
}
