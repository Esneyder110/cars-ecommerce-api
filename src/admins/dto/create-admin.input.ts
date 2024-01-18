import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAdminInput {
  @Field(() => String, { description: 'Admin email' })
  email: string;

  @Field(() => String, { description: 'User password' })
  password: string;

  @Field(() => String, { description: 'Admin name' })
  name: string;

  @Field(() => Int, { description: 'Admin access level' })
  level: number;
}
