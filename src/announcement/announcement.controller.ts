import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './dto';
import { FormDataRequest } from 'nestjs-form-data';
import { Response } from 'express';

@Controller('announcements')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) { }

  @Post()
  @FormDataRequest()
  async create(@Body() createAnnouncementDto: CreateAnnouncementDto, @Res() res: Response) {
    const CreateAnnouncement = await this.announcementService.create(createAnnouncementDto);

    return res.status(200).json({
      code: 200,
      msg: `Announcement ${CreateAnnouncement.title} has been created successfully`,

    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const announcements = await this.announcementService.findAll();

    return res.status(200).json({
      code: 200,
      msg: 'Here is Your Announcements',
      data: {
        announcements
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
  @FormDataRequest()
  async update(@Param('uuid') uuid: string, @Body() updateAnnouncementDto: UpdateAnnouncementDto, @Res() res: Response) {
    const updateAnnouncement = await this.announcementService.update(uuid, updateAnnouncementDto);

    return res.status(200).json({
      code: 200,
      msg: 'Announcement has been updated successfully',
      data: {
        updateAnnouncement
      },
    });
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
