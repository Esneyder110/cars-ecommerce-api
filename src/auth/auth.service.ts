import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin, User } from '@prisma/client';

import { UsersService } from 'src/users/users.service';
import { CreateUserInput } from 'src/users/dto';
import { SignInAuthInput } from './dto';
import { TokenPayload } from './entities';
import { UserRole } from './enums';
import { AdminService } from 'src/admins/admin.service';
import { CreateAdminInput } from 'src/admins/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly adminService: AdminService,
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

  async createAdmin(createAdminInput: CreateAdminInput) {
    const admin = await this.adminService.create(createAdminInput);
    const payload: TokenPayload = {
      sub: admin.id,
      email: admin.email,
      role: UserRole.ADMIN,
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

  async getAdminToken(signInAuthInput: SignInAuthInput) {
    const admin = await this.adminService.findOneByEmail(signInAuthInput.email);
    const isMatch = await bcrypt.compare(
      signInAuthInput.password,
      admin.password,
    );

    if (!isMatch)
      throw new BadRequestException('Invalid Password', {
        cause: new Error(),
        description: "The passwords don't match",
      });

    const payload: TokenPayload = {
      sub: admin.id,
      email: admin.email,
      role: UserRole.ADMIN,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }

  async getUserByToken(token: string): Promise<Admin | User> {
    const decode = await this.jwtService.verifyAsync<TokenPayload>(token);

    if (decode.role === UserRole.CUSTOMER) {
      const user = this.userService.findOne(decode.sub);
      return user;
    }

    if (decode.role === UserRole.ADMIN) {
      const admin = await this.adminService.findOne(decode.sub);
      return admin;
    }
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
