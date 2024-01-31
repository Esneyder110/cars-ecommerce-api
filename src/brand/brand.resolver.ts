import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { BrandService } from './brand.service';
import { Brand } from './entities/brand.entity';
import { CreateBrandInput, UpdateBrandInput } from './dto';
import { AdminAuth, Public } from 'src/auth/decorators';
import { CarService } from 'src/car/car.service';

@Resolver(() => Brand)
export class BrandResolver {
  constructor(
    private readonly brandService: BrandService,
    private readonly carService: CarService,
  ) {}

  @Mutation(() => Brand)
  @AdminAuth(1)
  createBrand(@Args('createBrandInput') createBrandInput: CreateBrandInput) {
    return this.brandService.create(createBrandInput);
  }

  @Query(() => [Brand], { name: 'brands' })
  @Public()
  findAll() {
    return this.brandService.findAll();
  }

  @Query(() => Brand, { name: 'brand' })
  @Public()
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.brandService.findOne(id);
  }

  @Mutation(() => Brand)
  @AdminAuth(1)
  updateBrand(@Args('updateBrandInput') updateBrandInput: UpdateBrandInput) {
    return this.brandService.update(updateBrandInput.id, updateBrandInput);
  }

  @Mutation(() => Brand)
  @AdminAuth(1)
  removeBrand(@Args('id', { type: () => Int }) id: number) {
    return this.brandService.remove(id);
  }

  @ResolveField()
  async cars(@Parent() brand: Brand) {
    const { id } = brand;
    return this.carService.findAll({ brandId: id });
  }
}
