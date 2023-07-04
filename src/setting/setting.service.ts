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

  async update(uuid: string, updateSettingDto: UpdateSettingDto) {

    const setting = await this.prisma.sETTINGS.update({
      where: {
        uuid
      },
      data: {
        office_name: updateSettingDto.office_name,
        office_logo: updateSettingDto.office_logo,
        presence_entry_start: updateSettingDto.presence_entry_start,
        presence_entry_end: updateSettingDto.presence_entry_end,
        presence_exit: updateSettingDto.presence_exit,
        presence_location_address: updateSettingDto.presence_location_address,
        presence_location_latitude: updateSettingDto.presence_location_latitude,
        presence_location_longitude: updateSettingDto.presence_location_longitude,
        presence_meter_radius: updateSettingDto.presence_meter_radius,
      }
    });

    return setting
  }

  async deleteOldOfficeLogo(uuid: string) {
    const setting = await this.prisma.sETTINGS.findFirst({
      where: {
        uuid: uuid
      }
    });

    // Jika setting ditemukan dan memiliki logo kantor lama
    if (setting && setting.office_logo) {
      // Hapus file logo kantor lama
      await unlink(setting.office_logo);
    }
  }
}