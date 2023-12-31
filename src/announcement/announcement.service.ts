import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './dto';
import * as slug from 'slug';
import * as randomstring from 'randomstring';
import { v4 as uuidv4 } from 'uuid';
import { FILE_URL } from 'src/config';

@Injectable()
export class AnnouncementService {
  constructor(private prisma: PrismaService) { }

  async create(createAnnouncementDto: CreateAnnouncementDto, thumbnailFileName: string) {

    try {
      const announcement = await this.prisma.aNNOUNCEMENTS.create({
        data: {
          uuid: uuidv4(),
          title: createAnnouncementDto.title,
          slug: slug(createAnnouncementDto.title) + randomstring.generate(7),
          thumbnail: thumbnailFileName,
          content: createAnnouncementDto.content,
          created_at: new Date(),
          updated_at: new Date()
        },
      });

      const employees = await this.findAllEmployee()

      for (let i = 0; i < employees.length; i++) {
        const employee = employees[i];

        await this.prisma.eMPLOYEE_HAS_ANNOUNCEMENT_NOTIFICATIONS.create({
          data: {
            uuid: uuidv4(),
            employee_uuid: employee.uuid,
            announcement_uuid: announcement.uuid,
          }
        })
      }
      return announcement

    } catch (error) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: "Error! Please Contact Admin.",
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async findAll() {
    const announcements = await this.prisma.aNNOUNCEMENTS.findMany()

    return announcements.map((item) => {
      const { content, ...rest } = item;
      rest.thumbnail = FILE_URL + 'announcement/' + rest.thumbnail
      return rest;
    });
  }

  async findAllEmployee() {
    const employees = await this.prisma.eMPLOYEES.findMany({ select: { uuid: true } })

    return employees
  }

  async findOne(uuid: string) {

    const announcement = await this.prisma.aNNOUNCEMENTS.findUnique({ where: { uuid } })

    announcement.thumbnail = FILE_URL + 'announcement/' + announcement.thumbnail

    return announcement
  }

  async update(uuid: string, updateAnnouncementDto: UpdateAnnouncementDto) {

    const announcement = await this.findOne(uuid);

    if (!announcement) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Announcement failed to update!',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.prisma.aNNOUNCEMENTS.update({
      where: {
        uuid
      },
      data: {
        title: updateAnnouncementDto.title,
        content: updateAnnouncementDto.content,
        updated_at: new Date()
      }
    })
  }

  async updateAnnouncementThumbnail(uuid: string, thumbnailFileName: string) {
    try {
      await this.prisma.aNNOUNCEMENTS.update({
        where: { uuid },
        data: { thumbnail: thumbnailFileName },
      });

    } catch (error) {

      console.log(error)
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: "Error! Please Contact Admin.",
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async remove(uuid: string) {

    const announcement = await this.findOne(uuid);

    if (!announcement) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Announcement failed to delete! Record not found.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.prisma.aNNOUNCEMENTS.delete({ where: { uuid } })
  }
}
