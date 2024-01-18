import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Admin {
  @Field(() => String, { description: 'Admin id' })
  id: string;

  // TODO: change to Date type
  @Field(() => Int, { description: 'Admin creation date' })
  createdAt: number;

  // TODO: change to Date type
  @Field(() => Int, { description: 'Admin last update date' })
  updatedAt: number;

  @Field(() => String, { description: 'Admin email' })
  email: string;

  // @Field(() => String, { description: 'User password' })
  password: string;

  @Field(() => String, { description: 'Admin name' })
  name: string;

  @Field(() => Int, { description: 'Admin access level' })
  level: number;
}
