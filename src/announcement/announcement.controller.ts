import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { Response } from 'express';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) { }

  @Post()
  @FormDataRequest()
  async create(@Body() createAnnouncementDto: CreateAnnouncementDto, @Res() res: Response) {
    const announcement = await this.announcementService.create(createAnnouncementDto);

    return res.status(200).json({
      code: 200,
      msg: 'Announcement ' + announcement.title + ' has been created successfully',
    });
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    const announcement = await this.announcementService.findAll();

    return res.status(200).json({
      code: 200,
      msg: 'Here is Your Announcements',
      data: {
        announcement
      },
    });
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string, @Res() res: Response) {
    const announcement = await this.announcementService.findOne(uuid);

    if (announcement == null) {
      return res.status(422).json({
        code: 422,
        msg: 'Announcement not found!'
      });
    }

    return res.status(200).json({
      code: 200,
      msg: 'Here is Your Announcement',
      data: {
        announcement
      },
    });
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateAnnouncementDto: UpdateAnnouncementDto) {
    return this.announcementService.update(uuid, updateAnnouncementDto);
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string, @Res() res: Response) {
    const announcement = await this.announcementService.remove(uuid);

    return res.status(200).json({
      code: 200,
      msg: 'Banner ' + announcement.title + ' has been Deleted'
    })
  }
}
