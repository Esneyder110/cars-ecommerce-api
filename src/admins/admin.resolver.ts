import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { AdminService } from './admin.service';
import { Admin } from './entities';
import { CreateAdminInput, UpdateAdminInput } from './dto';
import { AdminAuth, CurrentAdmin } from 'src/auth/decorators';

@Resolver(() => Admin)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @AdminAuth(5)
  @Mutation(() => Admin)
  createAdmin(@Args('createAdminInput') createAdminInput: CreateAdminInput) {
    return this.adminService.create(createAdminInput);
  }

  @AdminAuth(1)
  @Query(() => Admin, { name: 'getMyAdmin' })
  getMyAdmin(@CurrentAdmin() admin: Admin) {
    return this.adminService.findOne(admin.id);
  }

  @AdminAuth(3)
  @Query(() => [Admin], { name: 'admins' })
  findAll() {
    return this.adminService.findAll();
  }

  @AdminAuth(3)
  @Query(() => Admin, { name: 'admin' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.adminService.findOne(id);
  }

  @AdminAuth(5)
  @Mutation(() => Admin)
  updateAdmin(@Args('updateAdminInput') updateAdminInput: UpdateAdminInput) {
    return this.adminService.update(updateAdminInput.id, updateAdminInput);
  }

  @AdminAuth(5)
  @Mutation(() => Admin)
  removeAdmin(@Args('id', { type: () => String }) id: string) {
    return this.adminService.remove(id);
  }
}
