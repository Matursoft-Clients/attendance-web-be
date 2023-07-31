import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { Response } from 'express';

@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) { }

  @Post()
  @FormDataRequest()
  async create(@Body() createBranchDto: CreateBranchDto, @Res() res: Response) {
    const createdBranch = await this.branchService.create(createBranchDto);

    return res.status(200).json({
      code: 200,
      msg: `Branch ${createdBranch.name} has been created successfully`,

    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const branches = await this.branchService.findAll();

    return res.status(200).json({
      code: 200,
      msg: 'Here is Your Branches',
      data: { branches },
    });
  }

  @Get('get-city/:name')
  async getCity(@Param('name') name: string, @Res() res: Response) {

    console.log(name)
    const cities = await this.branchService.getCity(name);

    return res.status(200).json({
      code: 200,
      msg: 'Here is Your Cities',
      data: { cities },
    });
  }

  @Patch(':uuid')
  @FormDataRequest()
  async update(@Param('uuid') uuid: string, @Body() updateBranchDto: UpdateBranchDto, @Res() res: Response) {
    const updatedBranch = await this.branchService.update(uuid, updateBranchDto);

    return res.status(200).json({
      code: 200,
      msg: `Branch ${updatedBranch.name} has been updated successfully`,
    });
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string, @Res() res: Response) {
    const branch = await this.branchService.remove(uuid);

    return res.status(200).json({
      code: 200,
      msg: `Branch ${branch.name} has been Deleted`
    })
  }
}
