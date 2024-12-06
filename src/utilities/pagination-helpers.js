function getLimitAndOffset({ page = 1, size = 10 }) {
  if (isNaN(parseInt(page))) {
    throw new Error('getPaginationObject Error: page must be a number.');
  }
  if (isNaN(parseInt(size))) {
    throw new Error('getPaginationObject Error: size must be a number.');
  }

  if (page < 1) {
    page = 1;
  }

  const limit = size;
  const offset = (page - 1) * size;

  return [limit, offset];
}

function getPaginationObject({ page = 1, size = 10, total = 0 }) {
  if (isNaN(parseInt(page))) {
    throw new Error('getPaginationObject Error: page must be a number.');
  }
  if (isNaN(parseInt(size))) {
    throw new Error('getPaginationObject Error: size must be a number.');
  }
  if (isNaN(parseInt(total))) {
    throw new Error('getPaginationObject Error: total must be a number.');
  }

  if (page < 1) {
    page = 1;
  }

  const lastPage = Math.ceil(total / size);
  return {
    total,
    lastPage,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < lastPage ? page + 1 : null,
    perPage: size,
    currentPage: page,
  };
}

export default {
  getLimitAndOffset,
  getPaginationObject,
};
