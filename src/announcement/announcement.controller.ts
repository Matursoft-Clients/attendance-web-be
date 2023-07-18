import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { Response } from 'express';
import { copyFileSync, unlink } from 'fs';
import { join } from 'path';
import * as randomstring from 'randomstring';
import { FILE_PATH } from 'src/config';

@Controller('announcements')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) { }

  @Post()
  @FormDataRequest({ storage: FileSystemStoredFile })
  async create(@Body() createAnnouncementDto: CreateAnnouncementDto, @Res() res: Response) {
    const thumbnail: FileSystemStoredFile = createAnnouncementDto.thumbnail

    const fileExtension = thumbnail.originalName.split('.').pop();
    const fileName = randomstring.generate(10) + '.' + fileExtension;
    const filePath = join(FILE_PATH, 'announcement', fileName);

    copyFileSync(thumbnail.path, filePath);

    const createdAnnouncement = await this.announcementService.create(createAnnouncementDto, fileName);


    return res.status(200).json({
      code: 200,
      msg: `Announcement ${createdAnnouncement.title} has been created successfully`,

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

    if (!announcement) {
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
  @FormDataRequest({ storage: FileSystemStoredFile })
  async update(@Param('uuid') uuid: string, @Body() updateAnnouncementDto: UpdateAnnouncementDto, @Res() res: Response) {
    const updateAnnouncement = await this.announcementService.update(uuid, updateAnnouncementDto);

    const thumbnail: FileSystemStoredFile = updateAnnouncementDto.thumbnail

    // Proses foto baru
    if (thumbnail) {
      // Simpan foto baru di lokal
      const fileExtension = thumbnail.originalName.split('.').pop();
      const fileName = randomstring.generate(10) + '.' + fileExtension;

      const filePath = join(FILE_PATH, 'announcement', fileName);

      copyFileSync(thumbnail.path, filePath);


      // Hapus foto lama jika ada
      const announcement = await this.announcementService.findOne(uuid);
      if (announcement && announcement.thumbnail) {
        // Hapus foto lama dari lokal
        const oldFilePath = join(FILE_PATH, 'announcement', announcement.thumbnail);

        unlink(oldFilePath, (err) => {
          if (err) {
            console.error('Gagal menghapus foto lama:', err);
          } else {
            console.log('Foto lama berhasil dihapus');
          }
        });
      }

      // Update coloumn employee photo
      await this.announcementService.updateAnnouncementThumbnail(uuid, fileName);
    }

    return res.status(200).json({
      code: 200,
      msg: 'Announcement has been updated successfully',
    });
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string, @Res() res: Response) {
    const announcement = await this.announcementService.remove(uuid);

    // Delete image
    const oldFilePath = join(FILE_PATH, 'announcement', announcement.thumbnail);

    unlink(oldFilePath, (err) => {
      if (err) {
        console.error('Gagal menghapus foto lama:', err);
      } else {
        console.log('Foto lama berhasil dihapus');
      }
    });

    return res.status(200).json({
      code: 200,
      msg: 'Announcement ' + announcement.title + ' has been deleted'
    })
  }
}
