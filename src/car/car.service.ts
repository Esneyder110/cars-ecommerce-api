import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateCarInput, UpdateCarInput } from './dto';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class CarService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCarInput: CreateCarInput) {
    return this.prisma.car.create({
      data: { ...createCarInput },
    });
  }

  findAll(where?: Prisma.CarWhereInput) {
    return this.prisma.car.findMany({ where });
  }

  findOne(id: number) {
    return this.prisma.car.findUnique({ where: { id } });
  }

  update(id: number, updateCarInput: UpdateCarInput) {
    return this.prisma.car.update({
      where: { id },
      data: { ...updateCarInput },
    });
  }

  remove(id: number) {
    return this.prisma.car.delete({ where: { id } });
  }
}
