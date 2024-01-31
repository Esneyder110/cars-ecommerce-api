import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCarInput {
  id: number;

  @Field(() => String, { description: 'Car name' })
  name: string;

  @Field(() => String, { description: 'Car model' })
  model: string;

  @Field(() => Int, { description: 'Car brand' })
  brandId;

  @Field(() => Int, { description: 'Car price' })
  price: number;

  @Field(() => [String], { description: 'Car images' })
  images: string[];

  @Field(() => String, { description: 'Car color' })
  color: string;

  @Field(() => String, { description: 'Car transmission' })
  transmission: string;
}
