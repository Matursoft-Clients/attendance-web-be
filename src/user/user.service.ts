import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) { }

  async findOne(uuid: string) {
    return await this.prisma.uSERS.findUnique({ where: { uuid } })
  }

  async findUserByEmail(email: string) {
    return await this.prisma.uSERS.findUnique({ where: { email } })
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const userInUpdate = await this.findOne(uuid);

    if (!userInUpdate) {
      throw new HttpException(
        {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: 'User failed to update! Record not found.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (updateUserDto.password) {
      if (!('password_confirmation' in updateUserDto)) {
        throw new HttpException(
          {
            code: HttpStatus.UNPROCESSABLE_ENTITY,
            msg: 'Password confirmation is required.',
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    // Cek duplicate Email
    const user = await this.findUserByEmail(updateUserDto.email);

    if (user) {
      if (updateUserDto.email == user.email && userInUpdate.email !== updateUserDto.email) {
        throw new HttpException(
          {
            code: HttpStatus.UNPROCESSABLE_ENTITY,
            msg: 'Employee failed to update! Email already in use.',
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    console.log(userInUpdate)
    console.log(updateUserDto.password)

    try {
      const updateEmployee = await this.prisma.uSERS.update({
        where: { uuid },
        data: {
          name: updateUserDto.name,
          email: updateUserDto.email,
          password: updateUserDto.password ? await bcrypt.hash(updateUserDto.password, 10) : userInUpdate.password,
          updated_at: new Date()
        },
      });

      return updateEmployee;
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

  async updateUserPhoto(uuid: string, photoName: string) {
    try {
      await this.prisma.uSERS.update({
        where: { uuid },
        data: {
          photo: photoName,
        },
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
}
