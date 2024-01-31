import { Injectable } from '@nestjs/common';

import { CreateBrandInput, UpdateBrandInput } from './dto';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBrandInput: CreateBrandInput) {
    return this.prisma.brand.create({
      data: { ...createBrandInput },
    });
  }

  findAll() {
    return this.prisma.brand.findMany();
  }

  findOne(id: number) {
    return this.prisma.brand.findUnique({ where: { id } });
  }

  update(id: number, updateBrandInput: UpdateBrandInput) {
    return this.prisma.brand.update({
      where: { id },
      data: { ...updateBrandInput },
    });
  }

  remove(id: number) {
    return this.prisma.brand.delete({ where: { id } });
  }
}
