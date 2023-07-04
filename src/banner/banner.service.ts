import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BannerService {
  constructor(private prisma: PrismaService) { }

  create(createBannerDto: CreateBannerDto) {
    return 'This action adds a new banner';
  }

  findAll() {
    return this.prisma.bANNERS.findMany()
  }

  async remove(uuid: string) {
    try {
      return await this.prisma.bANNERS.delete({
        where: {
          uuid
        }
      })
    } catch (error) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Banner not found!',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
