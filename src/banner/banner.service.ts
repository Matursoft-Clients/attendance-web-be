import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBannerDto } from './dto';
import { v4 as uuidv4 } from 'uuid';
import { WEB_URL } from 'src/config';

@Injectable()
export class BannerService {

  constructor(private prisma: PrismaService) { }

  async create(createBannerDto: CreateBannerDto, imageFileName: string) {
    try {
      const createBanner = await this.prisma.bANNERS.create({
        data: {
          uuid: uuidv4(),
          name: createBannerDto.name,
          image: imageFileName,
          created_at: new Date(),
          updated_at: new Date()
        },
      });

      return createBanner;
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
    const banners = await this.prisma.bANNERS.findMany()

    banners.map((e) => {
      console.log(e)
      e.image = WEB_URL + 'banner/' + e.image
    })

    return banners
  }

  async findOne(uuid: string) {
    return await this.prisma.bANNERS.findUnique({ where: { uuid } })
  }

  async remove(uuid: string) {
    const banner = await this.findOne(uuid);

    if (!banner) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Banner failed to delete! Record not found.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.prisma.bANNERS.delete({ where: { uuid } })
  }
}
