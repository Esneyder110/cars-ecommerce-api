import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBrandInput {
  @Field(() => String, { description: 'Brand name' })
  name: string;
}
