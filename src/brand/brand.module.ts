import { Module, forwardRef } from '@nestjs/common';

import { BrandService } from './brand.service';
import { BrandResolver } from './brand.resolver';
import { CarModule } from 'src/car/car.module';

@Module({
  imports: [forwardRef(() => CarModule)],
  providers: [BrandResolver, BrandService],
  exports: [BrandService],
})
export class BrandModule {}
