import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';

@Injectable()
export class EmployeeService {
  create(createEmployeeDto: CreateEmployeeDto) {
    return 'This action adds a new employee';
  }

  findAll() {
    return `This action returns all employee`;
  }

  findOne(uuid: string) {
    return `This action returns a #${uuid} employee`;
  }

  update(uuid: string, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${uuid} employee`;
  }

  remove(uuid: string) {
    return `This action removes a #${uuid} employee`;
  }
}
