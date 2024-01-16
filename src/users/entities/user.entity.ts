import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String, { description: 'User id' })
  id: string;

  @Field(() => Int, { description: 'User creation date' })
  createdAt: number;

  @Field(() => Int, { description: 'User last update date' })
  updatedAt: number;

  @Field(() => String, { description: 'User email' })
  email: string;

  // @Field(() => String, { description: 'User password' })
  password: string;

  @Field(() => String, { description: 'User name' })
  name: string;
}
