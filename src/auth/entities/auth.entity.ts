import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => String, { description: 'Auth Token' })
  access_token: string;
}
