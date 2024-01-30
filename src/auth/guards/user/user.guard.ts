import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requestGQL = GqlExecutionContext.create(context).getContext().req;

    if (requestGQL.authInfo.level)
      throw new ForbiddenException('Access level found', {
        cause: new Error(),
        description: 'The user is a admin',
      });

    requestGQL.user = requestGQL.authInfo;
    return true;
  }
}
