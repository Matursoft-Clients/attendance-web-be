import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { JobPositionService } from './job-position.service';
import { Response } from 'express';
import { FormDataRequest } from 'nestjs-form-data';
import { CreateJobPositionDto, UpdateJobPositionDto } from './dto';

@Controller('job-positions')
export class JobPositionController {
  constructor(private readonly jobPositionService: JobPositionService) { }

  @Post()
  @FormDataRequest()
  async create(@Body() createJobPositionDto: CreateJobPositionDto, @Res() res: Response) {
    const createdJobPosition = await this.jobPositionService.create(createJobPositionDto);

    return res.status(200).json({
      code: 200,
      msg: `Job Position ${createdJobPosition.name} has been created successfully`,

    });

  }

  @Get()
  async findAll(@Res() res: Response) {
    const jobPositions = await this.jobPositionService.findAll();

    return res.status(200).json({
      code: 200,
      msg: 'Here is Your Job Positions',
      data: {
        jobPositions
      },
    });
  }

  @Patch(':uuid')
  @FormDataRequest()
  async update(@Param('uuid') uuid: string, @Body() updateJobPositionDto: UpdateJobPositionDto, @Res() res: Response) {
    const updatedJobPosition = await this.jobPositionService.update(uuid, updateJobPositionDto);

    return res.status(200).json({
      code: 200,
      msg: `Job Position ${updatedJobPosition.name} has been updated successfully`,
    });
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string, @Res() res: Response) {
    const jobPosition = await this.jobPositionService.remove(uuid);

    return res.status(200).json({
      code: 200,
      msg: `Job Position ${jobPosition.name} has been deleted`
    })
  }
}
