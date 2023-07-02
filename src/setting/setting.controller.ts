import { Controller, Get, Body, Param, Res, UseGuards, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from "express";
import { SettingService } from './setting.service';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { UpdateSettingDto } from './dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

const allowedFileExtensions = ['.jpg', '.jpeg', '.png'];

const fileFilter = (req, file, cb) => {
  const fileExt = extname(file.originalname).toLowerCase();

  if (allowedFileExtensions.includes(fileExt)) {
    cb(null, true); // Terima file
  } else {
    // Tolak file dengan error jika ekstensi tidak diizinkan
    cb(
      new HttpException(
        `File type ${fileExt} is not allowed.`,
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
};

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
  @Post(':uuid')
  @UseInterceptors(
    FileInterceptor('office_logo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const extension = extname(file.originalname);
          cb(null, `${uniqueSuffix}${extension}`);
        },
      }),
      fileFilter: fileFilter,
    }),
  )
  async update(@Param('uuid') uuid: string, @Body() updateSettingDto: UpdateSettingDto, @UploadedFile() officeLogo: Express.Multer.File, @Res() res: Response) {
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

