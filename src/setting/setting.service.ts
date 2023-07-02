import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSettingDto } from './dto';
import { parse } from 'date-fns';
import { unlink } from 'fs/promises';

@Injectable()
export class SettingService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    return this.prisma.sETTINGS.findFirst()
  }

  async update(uuid: string, updateSettingDto: UpdateSettingDto) {

    // Parse string to time
    const presenceEntryStart = parse(updateSettingDto.presence_entry_start, 'HH:mm:ss', new Date());
    const presenceEntryEnd = parse(updateSettingDto.presence_entry_end, 'HH:mm:ss', new Date());
    const presenceExit = parse(updateSettingDto.presence_exit, 'HH:mm:ss', new Date());

    const setting = await this.prisma.sETTINGS.update({
      where: {
        uuid: uuid
      },
      data: {
        office_name: updateSettingDto.office_name,
        office_logo: updateSettingDto.office_logo,
        presence_entry_start: presenceEntryStart,
        presence_entry_end: presenceEntryEnd,
        presence_exit: presenceExit,
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