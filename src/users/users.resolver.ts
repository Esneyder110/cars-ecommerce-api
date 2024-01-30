import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { User } from './entities';
import { CurrentUser, UserAuth } from 'src/auth/decorators';
import { UpdateUserInput } from './dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

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

  // @Mutation(() => User)
  // createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.usersService.createCustomer(createUserInput);
  // }

  // @Query(() => [User], { name: 'users' })
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => String }) id: string) {
  //   return this.usersService.findOne(id);
  // }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => String }) id: string) {
  //   return this.usersService.remove(id);
  // }
}
