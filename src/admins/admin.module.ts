import { Global, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';

@Global()
@Module({
  providers: [AdminResolver, AdminService],
  exports: [AdminService],
})
export class AdminModule {}
