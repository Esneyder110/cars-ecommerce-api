import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Car } from 'src/car/entities';
import { User } from 'src/users/entities';

@ObjectType()
export class Post {
  @Field(() => Int, { description: 'Post id' })
  id: number;

  @Field(() => User, { description: 'Post user' })
  user: User;

  userId;

  @Field(() => Car, { description: 'Car of the post' })
  car: Car;

  // @Field(() => Comment, { description: 'Car of the post' })
  // comments;
}
