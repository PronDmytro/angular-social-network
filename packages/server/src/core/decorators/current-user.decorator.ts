import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((fieldName: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  // if route is protected, there is a user set in passport auth.middleware
  return req.user;
});
