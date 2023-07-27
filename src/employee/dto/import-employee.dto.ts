import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from "nestjs-form-data";

export class ImportEmployeeDto {

    @IsFile()
    @MaxFileSize(1e6)
    file: FileSystemStoredFile;

    // @IsFile()
    // @MaxFileSize(1e6)
    // @HasMimeType(['image/jpeg', 'image/png', 'image/jpg'])
    // photo: FileSystemStoredFile;
}

