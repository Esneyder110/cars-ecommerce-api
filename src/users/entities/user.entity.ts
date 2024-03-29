import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Post } from 'src/post/entities';

@ObjectType()
export class User {
  @Field(() => String, { description: 'User id' })
  id: string;

  // TODO: change to Date type
  @Field(() => Int, { description: 'User creation date' })
  createdAt: number;

  // TODO: change to Date type
  @Field(() => Int, { description: 'User last update date' })
  updatedAt: number;

  @Field(() => String, { description: 'User email' })
  email: string;

  password: string;

  @Field(() => String, { description: 'User name' })
  name: string;

  @Field(() => [Post], { description: 'User posts' })
  posts: Post[];
}
