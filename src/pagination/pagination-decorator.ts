import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PaginationParams = createParamDecorator(
  (
    data = {
      defaultPage: 0,
      defaultLimit: 10,
      defaultOrderBy: {},
      defaultParams: undefined,
    },
    ctx: ExecutionContext,
  ) => {
    const { defaultPage, defaultLimit, defaultOrderBy } = data;

    const {
      query: {
        page = defaultPage,
        limit = defaultLimit,
        sort,
        sortBy,
        ...params
      },
    } = ctx.switchToHttp().getRequest();

    const skip = (page > 0 ? page - 1 : 0) * limit;
    return {
      skip,
      page,
      limit: Number(limit),
      orderBy: sortBy && sort ? { [sortBy]: sort } : defaultOrderBy,
      params: Object.values(params).length ? params : null,
    };
  },
);
