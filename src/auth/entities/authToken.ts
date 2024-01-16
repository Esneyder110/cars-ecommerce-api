import { UserRole } from '../enums';

export interface TokenPayload {
  sub: string;
  email: string;
  role: UserRole;
}
