import { instanceToPlain } from 'class-transformer';

export const extractPaginationDetails = (queryDto) => {
  let modifiedParams = null;
  const { page = 0, limit = 10, skip, ...params } = queryDto;

  const modifiedSkip = skip ? skip : (page > 0 ? page - 1 : 0) * limit;
  const hasParams = Object.keys(params);
  if (hasParams.length) {
    modifiedParams = hasParams.reduce((prev, curr) => {
      if (typeof params[curr] === 'object') {
        return {
          ...prev,
          [curr]: instanceToPlain(params[curr]),
        };
      }
      return {
        ...prev,
        [curr]: params[curr],
      };
    }, {});
  }

  return {
    skip: modifiedSkip,
    page,
    limit,
    params: modifiedParams,
  };
};
