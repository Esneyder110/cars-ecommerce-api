import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Car } from 'src/car/entities';

@ObjectType()
export class Brand {
  @Field(() => Int, { description: 'Brand id' })
  id: number;

  @Field(() => String, { description: 'Brand name' })
  name: string;

  @Field(() => [Car], { description: 'Brand cars' })
  cars: Car[];
}
