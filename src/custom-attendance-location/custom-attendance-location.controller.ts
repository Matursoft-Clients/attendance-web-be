import { Controller, Get, Post, Body, Param, Delete, Res } from '@nestjs/common';
import { CustomAttendanceLocationService } from './custom-attendance-location.service';
import { CreateCustomAttendanceLocationDto } from './dto';
import { Response } from 'express';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('custom-attendance-locations')
export class CustomAttendanceLocationController {
  constructor(private readonly customAttendanceLocationService: CustomAttendanceLocationService) { }

  @Post()
  @FormDataRequest()
  async create(@Body() createCustomAttendanceLocationDto: CreateCustomAttendanceLocationDto, @Res() res: Response) {
    await this.customAttendanceLocationService.create(createCustomAttendanceLocationDto);

    return res.status(200).json({
      code: 200,
      msg: `Custom attendance location has been created`,

    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const customAttendanceLocations = await this.customAttendanceLocationService.findAll();

    return res.status(200).json({
      code: 200,
      msg: 'Custom attendance locations',
      data: {
        customAttendanceLocations
      },
    });
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string, @Res() res: Response) {

    await this.customAttendanceLocationService.remove(uuid);

    return res.status(200).json({
      code: 200,
      msg: 'Custom attendance location has been deleted'
    })
  }
}
