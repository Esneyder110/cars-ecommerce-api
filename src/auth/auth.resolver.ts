import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ForbiddenException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Auth } from './entities';
import { CreateUserInput } from 'src/users/dto';
import { SignInAuthInput } from './dto';
import { Public } from './decorators';
import { CreateAdminInput } from 'src/admins/dto';
import { AdminService } from 'src/admins/admin.service';

@Public()
@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly adminService: AdminService,
  ) {}

  @Mutation(() => Auth)
  signUpCustomer(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.createCustomer(createUserInput);
  }

  @Query(() => Auth, { name: 'signInCustomer' })
  signInCustomer(@Args('signInAuthInput') signInAuthInput: SignInAuthInput) {
    return this.authService.getCustomerToken(signInAuthInput);
  }

  @Query(() => Auth, { name: 'signInAdmin' })
  signInAdmin(@Args('signInAuthInput') signInAuthInput: SignInAuthInput) {
    return this.authService.getAdminToken(signInAuthInput);
  }

  @Mutation(() => Auth, {
    deprecationReason:
      "Don't use this mutation to create new admins, this is only for the first admin",
  })
  async signUpAdmin(
    @Args('createAdminInput') createAdminInput: CreateAdminInput,
  ) {
    const admins = await this.adminService.findAll();
    if (admins.length !== 0)
      throw new ForbiddenException('Cannot create admins with this mutation', {
        cause: new Error(),
        description: 'This mutation only create the first admin',
      });

    return this.authService.createAdmin(createAdminInput);
  }

  // @Mutation(() => Auth)
  // createAuth(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
  //   return this.authService.create(createAuthInput);
  // }

  // @Query(() => [Auth], { name: 'auth' })
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Query(() => Auth, { name: 'auth' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.authService.findOne(id);
  // }

  // @Mutation(() => Auth)
  // updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
  //   return this.authService.update(updateAuthInput.id, updateAuthInput);
  // }

  // @Mutation(() => Auth)
  // removeAuth(@Args('id', { type: () => Int }) id: number) {
  //   return this.authService.remove(id);
  // }
}
