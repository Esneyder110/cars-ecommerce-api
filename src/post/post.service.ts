import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { UpdatePostInput } from './dto';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string) {
    return this.prisma.post.create({
      data: {
        userId,
      },
    });
  }

  findAll(where?: Prisma.PostWhereInput) {
    return this.prisma.post.findMany({ where });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, ...data } = updatePostInput;
    return this.prisma.post.update({
      where: {
        id,
      },
      data: {
        car: {
          update: {
            data,
          },
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
