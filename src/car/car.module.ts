import { Module, forwardRef } from '@nestjs/common';

import { CarService } from './car.service';
import { CarResolver } from './car.resolver';
import { BrandModule } from 'src/brand/brand.module';

@Module({
  imports: [forwardRef(() => BrandModule)],
  providers: [CarResolver, CarService],
  exports: [CarService],
})
export class CarModule {}
