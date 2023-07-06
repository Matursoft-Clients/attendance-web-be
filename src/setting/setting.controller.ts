import { Controller, Get, Body, Param, Res, UseGuards, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from "express";
import { SettingService } from './setting.service';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { UpdateSettingDto } from './dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { createWriteStream, unlink, copyFileSync } from 'fs';
import { join } from 'path';
import * as randomstring from 'randomstring';


@Controller('settings')
export class SettingController {
  constructor(private readonly settingService: SettingService) { }


  @Get()
  async findAll(@Res() res: Response) {
    const settings = await this.settingService.findAll();

    return res.status(200).json({
      code: 200,
      msg: 'Here is Your Settings',
      data: {
        settings
      },
    });
  }

  @UseGuards(AuthMiddleware)
  @FormDataRequest({ storage: FileSystemStoredFile })
  @Post(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateSettingDto: UpdateSettingDto, @Res() res: Response) {
    const office_logo: FileSystemStoredFile = updateSettingDto.office_logo

    let fileName = ''
    // Proses foto baru
    if (office_logo) {
      // Simpan foto baru di lokal
      const fileExtension = office_logo.originalName.split('.').pop();
      fileName = randomstring.generate(10) + '.' + fileExtension;
      const filePath = join(__dirname, '..', 'public', 'setting', 'office-logo', fileName);
      const fileStream = createWriteStream(filePath);

      fileStream.write(office_logo.path);

      fileStream.end();

      copyFileSync(office_logo.path, filePath.replace('dist/', ''));


      // Hapus foto lama jika ada
      const user = await this.settingService.findByUuid(uuid);
      if (user && user.office_logo) {
        // Hapus foto lama dari lokal
        const oldFilePathInDist = join(__dirname, '..', 'public', 'setting', 'office-logo', user.office_logo);

        const oldFilePath = oldFilePathInDist.replace('dist/', '')

        unlink(oldFilePath, (err) => {
          if (err) {
            console.error('Gagal menghapus foto lama:', err);
          } else {
            console.log('Foto lama berhasil dihapus');
          }
        });
      }
    }

    const name_office_logo = fileName;

    await this.settingService.update(uuid, updateSettingDto, name_office_logo);
    console.log(updateSettingDto)
    return res.status(200).json({
      code: 200,
      msg: 'Setting Successfully Updated',
    });
  }
}
