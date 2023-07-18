import { Controller, Get, Body, Param, Res, Patch } from '@nestjs/common';
import { Response } from "express";
import { SettingService } from './setting.service';
import { UpdateSettingDto } from './dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { unlink, copyFileSync } from 'fs';
import { join } from 'path';
import * as randomstring from 'randomstring';
import { FILE_PATH } from 'src/config';


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

  @FormDataRequest({ storage: FileSystemStoredFile })
  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateSettingDto: UpdateSettingDto, @Res() res: Response) {
    const office_logo: FileSystemStoredFile = updateSettingDto.office_logo

    await this.settingService.update(uuid, updateSettingDto);

    // Proses foto baru
    if (office_logo) {
      // Simpan foto baru di lokal
      const fileExtension = office_logo.originalName.split('.').pop();
      const fileName = randomstring.generate(10) + '.' + fileExtension;

      const filePath = join(FILE_PATH, 'setting', fileName);

      copyFileSync(office_logo.path, filePath);


      // Hapus foto lama jika ada
      const setting = await this.settingService.findOne(uuid);
      if (setting && setting.office_logo) {
        // Hapus foto lama dari lokal
        const oldFilePath = join(FILE_PATH, 'setting', setting.office_logo);

        unlink(oldFilePath, (err) => {
          if (err) {
            console.error('Gagal menghapus foto lama:', err);
          } else {
            console.log('Foto lama berhasil dihapus');
          }
        });
      }

      // Update coloumn employee photo
      await this.settingService.updateSettingOfficeLogo(uuid, fileName);
    }

    console.log(updateSettingDto)
    return res.status(200).json({
      code: 200,
      msg: 'Setting Successfully Updated',
    });
  }
}
