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

    const entryTime = '21:21:00';
    const [hours, minutes, seconds] = entryTime.split(':');


    const presenceEntryStart = updateSettingDto.presence_entry_start;
    // const [hours, minutes, seconds] = presenceEntryStart.split(':');

    // const date = new Date();
    // date.setHours(Number(hours));
    // date.setMinutes(Number(minutes));
    // date.setSeconds(Number(seconds));
    // date.toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    console.log('ok')
    const setting = await this.prisma.sETTINGS.update({
      where: {
        uuid
      },
      data: {
        office_name: updateSettingDto.office_name,
        presence_entry_start: new Date(+10),
        presence_entry_end: new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
        presence_exit: new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
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

  async findByUuid(uuid: string) {
    return await this.prisma.sETTINGS.findFirst({
      where: {
        uuid: uuid
      }
    });
  }
}