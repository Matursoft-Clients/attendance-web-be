import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as slug from 'slug';
import * as randomstring from 'randomstring';
import { v4 as uuidv4 } from 'uuid';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { AnnouncementDTO } from './announcement.interface';

@Injectable()
export class AnnouncementService {
  constructor(private prisma: PrismaService) { }

  async create(createAnnouncementDto: CreateAnnouncementDto) {
    try {
      const announcementCreated = await this.prisma.aNNOUNCEMENTS.create({
        data: {
          uuid: uuidv4(),
          title: createAnnouncementDto.title,
          slug: slug(createAnnouncementDto.title) + randomstring.generate(7),
          content: createAnnouncementDto.content,
          created_at: new Date(),
          updated_at: new Date()
        },
      });

      return announcementCreated;
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

  async findOne(uuid: string) {

    return await this.prisma.aNNOUNCEMENTS.findUnique({
      where: {
        uuid
      }
    })
  }

  async update(uuid: string, updateAnnouncementDto: UpdateAnnouncementDto) {
    const announcementUpdate = await this.prisma.aNNOUNCEMENTS.update({
      where: {
        uuid
      },
      data: {
        title: updateAnnouncementDto.title,
        content: updateAnnouncementDto.content,
        updated_at: new Date()
      }
    })

    return announcementUpdate
  }

  async remove(uuid: string) {
    try {
      return await this.prisma.aNNOUNCEMENTS.delete({
        where: {
          uuid
        }
      })
    } catch (error) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Announcement not found!',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
