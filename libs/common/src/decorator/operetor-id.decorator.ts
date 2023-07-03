import { ExecutionContext, SetMetadata, createParamDecorator } from "@nestjs/common";

export const OperetorId = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request['user']['sub'];
    return data ? user?.[data] : user;
  }
)
