import { Global, Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PostModule } from 'src/post/post.module';

@Global()
@Module({
  imports: [PostModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
