import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, ImportEmployeeDto, UpdateEmployeeDto, UpdateEmployeePhotoDto } from './dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import * as randomstring from 'randomstring';
import { join } from 'path';
import { copyFileSync, unlink } from 'fs';
import { Response } from 'express';
import { FILE_PATH } from 'src/config';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Post()
  @FormDataRequest({ storage: FileSystemStoredFile })
  async create(@Body() createEmployeeDto: CreateEmployeeDto, @Res() res: Response) {

    const photo: FileSystemStoredFile = createEmployeeDto.photo

    // Get the ext
    const fileExtension = photo.originalName.split('.').pop();

    // Make random file name
    const fileName = randomstring.generate(10) + '.' + fileExtension;

    // File path to public directory
    const filePath = join(FILE_PATH, 'employee', fileName);


    // Copy file to directory public
    copyFileSync(photo.path, filePath);

    const createdEmployee = await this.employeeService.create(createEmployeeDto, fileName);

    return res.status(200).json({
      code: 200,
      msg: `Employee ${createdEmployee.name} has been successfully created.`,
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const employees = await this.employeeService.findAll();

    return res.status(200).json({
      code: 200,
      msg: 'Here is Your Employees',
      data: {
        employees
      },
    });
  }

  @Patch(':uuid')
  @FormDataRequest({ storage: FileSystemStoredFile })
  async update(@Param('uuid') uuid: string, @Body() updateEmployeeDto: UpdateEmployeeDto, @Res() res: Response) {
    const photo: FileSystemStoredFile = updateEmployeeDto.photo
    const UpdatedEmployee = await this.employeeService.update(uuid, updateEmployeeDto);

    // Proses foto baru
    if (photo) {
      // Simpan foto baru di lokal
      const fileExtension = photo.originalName.split('.').pop();
      const fileName = randomstring.generate(10) + '.' + fileExtension;

      const filePath = join(FILE_PATH, 'employee', fileName);

      copyFileSync(photo.path, filePath);

      // Hapus foto lama jika ada
      const employee = await this.employeeService.findOne(uuid);

      if (employee && employee.photo) {
        // Hapus foto lama dari lokal
        const oldFilePath = join(FILE_PATH, 'employee', employee.photo);

        unlink(oldFilePath, (err) => {
          if (err) {
            console.error('Gagal menghapus foto lama:', err);
          } else {
            console.log('Foto lama berhasil dihapus');
          }
        });
      }
      // Update coloumn employee photo
      await this.employeeService.updateEmployeePhoto(uuid, fileName);
    }

    return res.status(200).json({
      code: 200,
      msg: `Employee ${UpdatedEmployee.name} successfully updated`,
    });

  }

  @Post(':uuid')
  @FormDataRequest({ storage: FileSystemStoredFile })
  async updateEmployeePhoto(@Param('uuid') uuid: string, @Body() updateEmployeePhotoDTO: UpdateEmployeePhotoDto) {
    const photo: FileSystemStoredFile = updateEmployeePhotoDTO.photo

    const fileExtension = photo.originalName.split('.').pop();
    const fileName = randomstring.generate(10) + '.' + fileExtension;

    const filePath = join(FILE_PATH, 'employee', fileName);

    copyFileSync(photo.path, filePath);

    return fileName
  }

  @Patch('refresh-device/:uuid')
  async RefreshEmployeeDevice(@Param('uuid') uuid: string, @Res() res: Response) {
    const createdEmployee = await this.employeeService.refreshEmployeeDevice(uuid);

    return res.status(200).json({
      code: 200,
      msg: `Employee ${createdEmployee.name} device has been successfully refreshed.`,
    });
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string, @Res() res: Response) {
    const employee = await this.employeeService.remove(uuid);

    try {
      // Delete image
      const oldFilePath = join(FILE_PATH, 'employee', employee.photo);


      unlink(oldFilePath, (err) => {
        if (err) {
          console.error('Gagal menghapus foto lama:', err);
        } else {
          console.log('Foto lama berhasil dihapus');
        }
      });
    } catch (err) {
      // Do nothing
    }

    return res.status(200).json({
      code: 200,
      msg: 'Employee ' + employee.name + ' has been deleted.'
    })
  }

  @Post('import/employee')
  @FormDataRequest({ storage: FileSystemStoredFile })
  async importEmployees(@Body() importEmployeeDto: ImportEmployeeDto, @Res() res: Response) {
    await this.employeeService.importEmployees(importEmployeeDto);

    return res.status(200).json({
      code: 200,
      msg: `Employees successfully created.`,
    });
  }
}
