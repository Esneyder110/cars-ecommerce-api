import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '@prisma/client';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = GqlExecutionContext.create(context).getContext().req;
    return request.user as User;
  },
);
