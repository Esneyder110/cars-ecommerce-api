import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Brand } from 'src/brand/entities';
import { Post } from 'src/post/entities';

@ObjectType()
export class Car {
  @Field(() => Int, { description: 'Car id' })
  id: number;

  @Field(() => String, { description: 'Car name' })
  name: string;

  @Field(() => String, { description: 'Car model' })
  model: string;

  @Field(() => Brand, { description: 'Car brand' })
  brand: Brand;

  brandId: number;

  @Field(() => Int, { description: 'Car price' })
  price: number;

  @Field(() => [String], { description: 'Car images' })
  images: string[];

  @Field(() => String, { description: 'Car color' })
  color: string;

  @Field(() => String, { description: 'Car transmission' })
  transmission: string;

  @Field(() => Post, { description: 'Car post' })
  post: Post;
}
