import { SetMetadata } from '@nestjs/common';

export const AccessLevel = (level: number) => SetMetadata('level', level);
