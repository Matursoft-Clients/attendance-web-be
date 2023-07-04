import { Controller, Get, Body, Param, Res, UseGuards, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from "express";
import { SettingService } from './setting.service';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { UpdateSettingDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('setting')
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
  @FormDataRequest()
  @UseInterceptors(FileInterceptor('file'))
  @Post(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateSettingDto: UpdateSettingDto, @UploadedFile() officeLogo: Express.Multer.File, @Res() res: Response) {

    console.log(updateSettingDto)
    console.log(officeLogo)

    // Jika file logo kantor ada dalam request
    if (officeLogo) {
      // Mendapatkan path file dari officeLogo.path
      updateSettingDto.office_logo = officeLogo.path;

      // Menghapus logo kantor lama jika ada
      await this.settingService.deleteOldOfficeLogo(uuid);
    }

    const setting = await this.settingService.update(uuid, updateSettingDto);
    console.log(updateSettingDto)
    return res.status(200).json({
      code: 200,
      msg: 'Setting Successfully Updated',
    });
  }
}
