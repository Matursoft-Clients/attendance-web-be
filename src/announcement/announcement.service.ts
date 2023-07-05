import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './dto';
import { AnnouncementDTO } from './announcement.interface';
import * as slug from 'slug';
import * as randomstring from 'randomstring';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AnnouncementService {
  constructor(private prisma: PrismaService) { }

  async create(createAnnouncementDto: CreateAnnouncementDto) {

    try {
      return await this.prisma.aNNOUNCEMENTS.create({
        data: {
          uuid: uuidv4(),
          title: createAnnouncementDto.title,
          slug: slug(createAnnouncementDto.title) + randomstring.generate(7),
          content: createAnnouncementDto.content,
          created_at: new Date(),
          updated_at: new Date()
        },
      });

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

  async findAll(): Promise<AnnouncementDTO[]> {
    const announcements = await this.prisma.aNNOUNCEMENTS.findMany()

    return announcements.map((item) => {
      const { content, ...rest } = item;
      return rest as AnnouncementDTO;
    });
  }

  async findOne(uuid: string): Promise<AnnouncementDTO> {

    return await this.prisma.aNNOUNCEMENTS.findUnique({ where: { uuid } })
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

  async remove(uuid: string) {

    const announcement = await this.findOne(uuid);

    if (!announcement) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Announcement failed to delete!',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.prisma.aNNOUNCEMENTS.delete({
      where: {
        uuid
      }
    })
  }
}
