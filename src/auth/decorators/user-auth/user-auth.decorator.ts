import { UseGuards } from '@nestjs/common';

import { UserGuard } from 'src/auth/guards';

export const UserAuth = () => {
  return UseGuards(UserGuard);
};
