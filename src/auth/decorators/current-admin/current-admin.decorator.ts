import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Admin } from '@prisma/client';

export const CurrentAdmin = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = GqlExecutionContext.create(context).getContext().req;
    return request.admin as Admin;
  },
);
