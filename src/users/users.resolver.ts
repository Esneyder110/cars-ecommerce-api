import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';

import { UsersService } from './users.service';
import { User } from './entities';
import { AdminAuth, CurrentUser, UserAuth } from 'src/auth/decorators';
import { UpdateUserInput } from './dto';
import { PostService } from 'src/post/post.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly postService: PostService,
  ) {}

  @Query(() => User, { name: 'getMyUser' })
  @UserAuth()
  getMyUser(@CurrentUser() user: User) {
    return this.usersService.findOne(user.id);
  }

  @Mutation(() => User)
  @UserAuth()
  updateMyUser(
    @CurrentUser() user: User,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(user.id, updateUserInput);
  }

  // TODO: Pagination
  @Query(() => [User], { name: 'users' })
  @AdminAuth(1)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @AdminAuth(1)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @ResolveField()
  async posts(@Parent() user: User) {
    const { id } = user;
    return this.postService.findAll({ userId: id });
  }
}
