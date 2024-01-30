import { UseGuards, applyDecorators } from '@nestjs/common';

import { AccessLevel } from '../access-level/access-level.decorator';
import { AdminGuard } from 'src/auth/guards';

export const AdminAuth = (level: number) => {
  return applyDecorators(AccessLevel(level), UseGuards(AdminGuard));
};
