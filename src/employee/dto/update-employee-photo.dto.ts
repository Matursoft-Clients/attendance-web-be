import { IsOptional, Validate } from 'class-validator';
import { FileSystemStoredFile } from 'nestjs-form-data';

export class UpdateEmployeePhotoDto {
    @IsOptional()
    @Validate(validateImageFile) // Validasi custom untuk file gambar
    photo?: FileSystemStoredFile; // Tambahkan tanda tanya (?) untuk mengindikasikan bahwa field boleh kosong
}

// Custom validator untuk validasi file gambar
function validateImageFile(value: FileSystemStoredFile) {
    console.log(value)
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
