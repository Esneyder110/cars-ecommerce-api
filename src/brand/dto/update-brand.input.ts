import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

import { CreateBrandInput } from './create-brand.input';

@InputType()
export class UpdateBrandInput extends PartialType(CreateBrandInput) {
  @Field(() => Int)
  id: number;
}
