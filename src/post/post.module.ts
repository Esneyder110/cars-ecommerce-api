import { Module } from '@nestjs/common';

import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { CarService } from 'src/car/car.service';

@Module({
  providers: [PostResolver, PostService, CarService],
  exports: [PostService],
})
export class PostModule {}
