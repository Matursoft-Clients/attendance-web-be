import { Controller, Body, Patch, Param, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { join } from 'path';
import { FILE_PATH } from 'src/config';
import { copyFileSync, createWriteStream, unlink } from 'fs';
import * as randomstring from 'randomstring';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Patch(':uuid')
  @FormDataRequest({ storage: FileSystemStoredFile })
  async update(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    const photo: FileSystemStoredFile = updateUserDto.photo
    const UpdatedUser = await this.userService.update(uuid, updateUserDto);

    // Proses foto baru
    if (photo) {
      // Simpan foto baru di lokal
      const fileExtension = photo.originalName.split('.').pop();
      const fileName = randomstring.generate(10) + '.' + fileExtension;

      const filePathInDisk = join(__dirname, fileName);
      const filePath = join(FILE_PATH, 'user', 'photo', fileName);


      const fileStream = createWriteStream(filePathInDisk);

      fileStream.write(photo.path);

      fileStream.end();

      copyFileSync(photo.path, filePath);

      // Hapus foto lama jika ada
      const user = await this.userService.findOne(uuid);

      if (user && user.photo) {
        // Hapus foto lama dari lokal
        const oldFilePath = join(FILE_PATH, 'user', 'photo', user.photo);

        unlink(oldFilePath, (err) => {
          if (err) {
            console.error('Gagal menghapus foto lama:', err);
          } else {
            console.log('Foto lama berhasil dihapus');
          }
        });
      }

      // Update coloumn user photo
      await this.userService.updateUserPhoto(uuid, fileName);
    }

    return res.status(200).json({
      code: 200,
      msg: `User ${UpdatedUser.name} successfully updated`,
    });
  }
}
