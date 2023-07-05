import { Controller, Get, Post, Body, Param, Delete, Res } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto';
import { FormDataRequest } from 'nestjs-form-data';
import { Response } from 'express';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) { }

  @Post()
  @FormDataRequest()
  create(@Body() createBannerDto: CreateBannerDto) {
    return this.bannerService.create(createBannerDto);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const banner = await this.bannerService.findAll();

    return res.status(200).json({
      code: 200,
      msg: 'Here is Your Banner',
      data: {
        banner
      },
    });
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string, @Res() res: Response) {
    const banner = await this.bannerService.remove(uuid);

    return res.status(200).json({
      code: 200,
      msg: 'Banner ' + banner.name + ' has been Deleted'
    })
  }
}
