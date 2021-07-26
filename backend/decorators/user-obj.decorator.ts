import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRes } from '../app-types';

export const UserObj = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserRes => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserRes;
  },
);
