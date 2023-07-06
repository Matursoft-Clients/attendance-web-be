import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSettingDto } from './dto';
import { unlink } from 'fs/promises';

@Injectable()
export class SettingService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    return this.prisma.sETTINGS.findFirst()
  }

  async update(uuid: string, updateSettingDto: UpdateSettingDto, office_logo: string) {

    console.log('ok')
    const dataToUpdate: any = {
      office_name: updateSettingDto.office_name,
      presence_entry_start: new Date(),
      presence_entry_end: new Date(),
      presence_exit: new Date(),
      presence_location_address: updateSettingDto.presence_location_address,
      presence_location_latitude: +updateSettingDto.presence_location_latitude,
      presence_location_longitude: +updateSettingDto.presence_location_longitude,
      presence_meter_radius: +updateSettingDto.presence_meter_radius,
    };

    if (updateSettingDto.office_logo) {
      dataToUpdate.office_logo = office_logo;
    }

    const setting = await this.prisma.sETTINGS.update({
      where: {
        uuid
      },
      data: dataToUpdate
    });

    return setting
  }

  async findByUuid(uuid: string) {
    return await this.prisma.sETTINGS.findFirst({
      where: {
        uuid: uuid
      }
    });
  }
}