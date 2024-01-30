import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requestGQL = GqlExecutionContext.create(context).getContext().req;

    if (!requestGQL.authInfo.level)
      throw new ForbiddenException('Access level not found', {
        cause: new Error(),
        description: 'The user is not a admin',
      });

    const accessLevel = this.reflector.get<number>(
      'level',
      context.getHandler(),
    );

    if (requestGQL.authInfo.level < accessLevel)
      throw new ForbiddenException('Access level to low', {
        cause: new Error(),
        description: "The admin don't have enough permissions",
      });

    requestGQL.admin = requestGQL.authInfo;
    return true;
  }
}
