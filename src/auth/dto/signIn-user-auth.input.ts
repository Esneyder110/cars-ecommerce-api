import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignInAuthInput {
  @Field(() => String, { description: 'User email' })
  email: string;

  @Field(() => String, { description: 'User password' })
  password: string;
}
