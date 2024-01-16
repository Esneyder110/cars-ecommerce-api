import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';
import { CreateUserInput } from 'src/users/dto';
import { SignInAuthInput } from './dto';
import { TokenPayload } from './entities';
import { UserRole } from './enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createCustomer(createUserInput: CreateUserInput) {
    const user = await this.userService.createCustomer(createUserInput);
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      role: UserRole.CUSTOMER,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }

  async getCustomerToken(signInAuthInput: SignInAuthInput) {
    const user = await this.userService.findOneByEmail(signInAuthInput.email);
    const isMatch = await bcrypt.compare(
      signInAuthInput.password,
      user.password,
    );

    if (!isMatch)
      throw new BadRequestException('Invalid Password', {
        cause: new Error(),
        description: "The passwords don't match",
      });

    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      role: UserRole.CUSTOMER,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }

  // async getAdminToken(signInAuthInput: SignInAuthInput) {
  //   // const user = await this.userService.findOneByEmail(signInAuthInput.email);
  //   // const payload = { sub: user.id, email: user.email, role: 'user' };
  //   // const access_token = await this.jwtService.signAsync(payload);
  //   return { access_token: 'no implemented' };
  // }

  async getUserByToken(token: string) {
    const decode = await this.jwtService.verifyAsync<TokenPayload>(token);
    if (decode.role === UserRole.CUSTOMER)
      return this.userService.findOne(decode.sub);

    // if (decode.role === UserRole.ADMIN)
    // return this.adminService.findOne(decode.sub);
  }

  // findAll() {
  //   // return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   // return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthInput: UpdateAuthInput) {
  //   // return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   // return `This action removes a #${id} auth`;
  // }
}
