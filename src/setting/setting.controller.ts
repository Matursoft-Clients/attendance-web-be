import { Controller, Get, Body, Param, Res, UseGuards, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from "express";
import { SettingService } from './setting.service';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { UpdateSettingDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { createWriteStream, unlink, rename, copyFile, copyFileSync } from 'fs';
import { join } from 'path';

@Controller('settings')
export class SettingController {
  constructor(private readonly settingService: SettingService) { }


  @Get()
  async findAll(@Res() res: Response) {
    const setting = await this.settingService.findAll();

    return res.status(200).json({
      code: 200,
      msg: 'Here is Your Setting',
      data: {
        setting
      },
    });
  }

  @UseGuards(AuthMiddleware)
  @FormDataRequest({ storage: FileSystemStoredFile })
  // @UseInterceptors(FileInterceptor('office_logo'))
  @Post(':uuid')
  async update(@Param('uuid') uuid: string,
    @Body() updateSettingDto: UpdateSettingDto,
    // @UploadedFile() office_logo: Express.Multer.File,
    @Res() res: Response) {
    const office_logo: FileSystemStoredFile = updateSettingDto.office_logo

    // Proses foto baru
    if (office_logo) {
      // Simpan foto baru di lokal
      // const fileExtension = office_logo.originalName.split('.').pop();
      // const fileName = `${uuid}.${fileExtension}`;
      // const filePath = join(__dirname, '..', 'public', 'setting', 'office-logo', fileName);
      // const fileStream = createWriteStream(filePath);
      // console.log(filePath)
      // fileStream.write(office_logo.path);
      // fileStream.end();

      // copyFileSync(office_logo.path, filePath.replace('dist/', ''));


      // Hapus foto lama jika ada
      // const user = await this.settingService.findByUuid(uuid);
      // if (user && user.office_logo) {
      //   // Hapus foto lama dari lokal
      //   const oldFilePath = join(__dirname, '..', 'public', 'setting', 'office-logo', user.office_logo);
      //   oldFilePath.replace('dist/', '')
      //   unlink(oldFilePath, (err) => {
      //     if (err) {
      //       console.error('Gagal menghapus foto lama:', err);
      //     } else {
      //       console.log('Foto lama berhasil dihapus');
      //     }
      //   });
      // }
    }


    //   // Simpan informasi foto baru ke basis data
    //   // user.office_logo = fileName;
    //   // await this.settingService.save(user);
    // }

    await this.settingService.update(uuid, updateSettingDto);
    console.log(updateSettingDto)
    return res.status(200).json({
      code: 200,
      msg: 'Setting Successfully Updated',
    });
  }
}
