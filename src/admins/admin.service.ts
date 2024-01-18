import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateAdminInput, UpdateAdminInput } from './dto';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAdminInput: CreateAdminInput) {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createAdminInput.password, salt);
    const admin = await this.prisma.admin.create({
      data: {
        ...createAdminInput,
        password,
      },
    });

    return admin;
  }

  async findAll() {
    const admins = await this.prisma.admin.findMany();

    return admins;
  }

  async findOne(id: string) {
    const admin = await this.prisma.admin.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return admin;
  }

  async findOneByEmail(email: string) {
    const admin = await this.prisma.admin.findUniqueOrThrow({
      where: {
        email,
      },
    });

    return admin;
  }

  async update(id: string, updateAdminInput: UpdateAdminInput) {
    const admin = await this.prisma.admin.update({
      where: {
        id,
      },
      data: {
        ...updateAdminInput,
      },
    });

    return admin;
  }

  async remove(id: string) {
    const admin = await this.prisma.admin.delete({
      where: {
        id,
      },
    });

    return admin;
  }
}
