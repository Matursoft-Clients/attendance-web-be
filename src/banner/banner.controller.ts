import { Controller, Get, Post, Body, Param, Delete, Res } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { Response } from 'express';
import { join } from 'path';
import { copyFileSync, createWriteStream, unlink } from 'fs';
import * as randomstring from 'randomstring';
import { FILE_PATH } from 'src/config';

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) { }

  @Post()
  @FormDataRequest({ storage: FileSystemStoredFile })
  async create(@Body() createBannerDto: CreateBannerDto, @Res() res: Response) {
    const image: FileSystemStoredFile = createBannerDto.image

    const fileExtension = image.originalName.split('.').pop();
    const fileName = randomstring.generate(10) + '.' + fileExtension;
    const filePathDist = join(__dirname, fileName);
    const filePath = join(FILE_PATH, 'banner', 'image', fileName);

    console.log(filePathDist)

    const fileStream = createWriteStream(filePathDist);

    fileStream.write(image.path);
    fileStream.end();

    copyFileSync(image.path, filePath);

    const createdBanner = await this.bannerService.create(createBannerDto, fileName);

    return res.status(200).json({
      code: 200,
      msg: `Job Position ${createdBanner.name} has been created successfully`,
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const banners = await this.bannerService.findAll();

    return res.status(200).json({
      code: 200,
      msg: 'Here is Your Banners',
      data: {
        banners
      },
    });
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string, @Res() res: Response) {
    const banner = await this.bannerService.remove(uuid);

    // Delete image
    const oldFilePath = join(FILE_PATH, 'banner', 'image', banner.image);

    unlink(oldFilePath, (err) => {
      if (err) {
        console.error('Gagal menghapus foto lama:', err);
      } else {
        console.log('Foto lama berhasil dihapus');
      }
    });

    return res.status(200).json({
      code: 200,
      msg: 'Banner ' + banner.name + ' has been Deleted'
    })
  }
}
