import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { Auth } from './entities';
import { CreateUserInput } from 'src/users/dto';
import { SignInAuthInput } from './dto';
import { Public } from './decorators';

@Public()
@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  signUpCustomer(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.createCustomer(createUserInput);
  }

  @Query(() => Auth, { name: 'signInCustomer' })
  signInCustomer(@Args('signInAuthInput') signInAuthInput: SignInAuthInput) {
    return this.authService.getCustomerToken(signInAuthInput);
  }

  // @Query(() => Auth, { name: 'auth' })
  // signInAdmin(@Args('signInAuthInput') signInAuthInput: SignInAuthInput) {
  //   return this.authService.getAdminToken(signInAuthInput);
  // }

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
