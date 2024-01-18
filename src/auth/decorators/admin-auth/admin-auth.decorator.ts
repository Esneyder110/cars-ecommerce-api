import { UseGuards } from '@nestjs/common';

import { AccessLevel } from '../access-level/access-level.decorator';
import { AdminGuard } from 'src/auth/guards';

export const AdminAuth = (level: number) => {
  return AccessLevel(level), UseGuards(AdminGuard);
};
