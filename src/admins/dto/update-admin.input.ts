import { InputType, Field, PartialType } from '@nestjs/graphql';

import { CreateAdminInput } from './create-admin.input';

@InputType()
export class UpdateAdminInput extends PartialType(CreateAdminInput) {
  @Field(() => String)
  id: string;
}
