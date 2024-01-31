import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CarService } from './car.service';
import { Car } from './entities/car.entity';
import { BrandService } from 'src/brand/brand.service';

@Resolver(() => Car)
export class CarResolver {
  constructor(
    private readonly carService: CarService,
    private readonly brandService: BrandService,
  ) {}

  @ResolveField()
  async brand(@Parent() car: Car) {
    const { brandId } = car;
    return this.brandService.findOne(brandId);
  }

  @ResolveField()
  async post(@Parent() car: Car) {
    const { id } = car;
    return this.brandService.findOne(id);
  }
}
