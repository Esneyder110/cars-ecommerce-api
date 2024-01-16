import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserInput, UpdateUserInput } from './dto';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createCustomer(createUserInput: CreateUserInput) {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createUserInput.password, salt);
    const user = await this.prisma.user.create({
      data: {
        ...createUserInput,
        password,
      },
    });

    return user;
  }

  async findAll() {
    // return `This action returns all users`;
    const users = await this.prisma.user.findMany();

    return users;
  }

  async findOne(id: string) {
    // return `This action returns a #${id} user`;
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });

    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    // return `This action updates a #${id} user`;
    // TODO: encriptar password
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserInput,
      },
    });

    return user;
  }

  async remove(id: string) {
    // return `This action removes a #${id} user`;
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return user;
  }
}
