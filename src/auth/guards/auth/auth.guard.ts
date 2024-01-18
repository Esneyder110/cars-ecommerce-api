import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { AuthService } from 'src/auth/auth.service';
import { IS_PUBLIC_KEY } from 'src/auth/decorators';
import { authFinder } from 'src/auth/helpers';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const requestGQL = GqlExecutionContext.create(context).getContext().req;

    const authToken = authFinder(requestGQL);
    if (!authToken)
      throw new BadRequestException('Token not found', {
        cause: new Error(),
        description: 'There is not token in the request',
      });

    const user = await this.authService.getUserByToken(authToken);
    requestGQL.authInfo = user;

    return true;
  }
}
