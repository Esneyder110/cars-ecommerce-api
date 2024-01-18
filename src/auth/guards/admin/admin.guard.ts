import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requestGQL = GqlExecutionContext.create(context).getContext().req;

    if (typeof requestGQL.authInfo.level === undefined)
      throw new ForbiddenException('Access level not found', {
        cause: new Error(),
        description: 'The user is not a admin',
      });

    requestGQL.admin = requestGQL.authInfo;
    return true;
  }
}
