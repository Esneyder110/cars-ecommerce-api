import { Injectable } from '@nestjs/common';

import { CreateUserInput, UpdateUserInput } from './dto';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createCustomer(createUserInput: CreateUserInput) {
    // return 'This action adds a new user';
    // TODO: encriptar password
    const user = await this.prisma.user.create({
      data: {
        ...createUserInput,
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
