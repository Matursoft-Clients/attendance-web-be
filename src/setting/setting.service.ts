import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSettingDto } from './dto';
import { FILE_URL } from 'src/config';

@Injectable()
export class SettingService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    const setting = await this.prisma.sETTINGS.findFirst()

    // Update office logo with full url
    setting['office_logo'] = setting['office_logo'] ? FILE_URL + 'setting/' + setting['office_logo'] : null

    return setting
  }

  async update(uuid: string, updateSettingDto: UpdateSettingDto) {
    const settingInUpdate = await this.findOne(uuid);

    if (!settingInUpdate) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'Setting failed to update! Record not found.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    try {
      const updateSetting = await this.prisma.sETTINGS.update({
        where: {
          uuid
        },
        data: {
          office_name: updateSettingDto.office_name,
          presence_entry_start: updateSettingDto.presence_entry_start,
          presence_entry_end: updateSettingDto.presence_entry_end,
          presence_exit: updateSettingDto.presence_exit,
          presence_meter_radius: +updateSettingDto.presence_meter_radius,
          mobile_app_version: updateSettingDto.mobile_app_version,
          play_store_url: updateSettingDto.play_store_url,
          updated_at: new Date()
        }
      });

      return updateSetting

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

  async updateSettingOfficeLogo(uuid: string, officeLogoName: string) {
    try {
      await this.prisma.sETTINGS.update({
        where: { uuid },
        data: { office_logo: officeLogoName },
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

  async findOne(uuid: string) {
    return await this.prisma.sETTINGS.findUnique({ where: { uuid } });
  }
}