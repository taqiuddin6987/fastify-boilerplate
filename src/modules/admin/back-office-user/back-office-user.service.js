import model from '#models/back-office-user.model';
import generateUserTokens from '#utilities/generate-user-tokens';
import HTTP_STATUS from '#utilities/http-status';
import promiseHandler from '#utilities/promise-handler';
import createRedisFunctions from '#utilities/redis-helpers';
import {
  getAccessTokenKey,
  getKeysPattern,
  getRefreshTokenKey,
} from '#utilities/redis-keys';

const login = async (req) => {
  const promise = model.login(req);

  const [error, result] = await promiseHandler(promise);
  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }

  const isPasswordMatch = await req.bcrypt.compare(
    req.body.password,
    result.password
  );

  if (!isPasswordMatch) {
    const err = new Error(`invalid credentials`);
    err.code = HTTP_STATUS.UNAUTHORIZED;
    throw err;
  }

  delete result.password;

  const { id, tenant } = result;

  const tokens = await generateUserTokens(req, { id, tenant });

  return {
    code: HTTP_STATUS.OK,
    message: 'signed in successfully.',
    data: {
      ...result,
      ...tokens,
    },
  };
};

const logout = async (req) => {
  const { id } = req.user;

  const { keys, del } = createRedisFunctions(req.redis);

  if (req.body.invalidateAllTokens) {
    const pattern = getKeysPattern(id);
    const userKeys = await keys(pattern);
    await del(userKeys);

    return {
      code: HTTP_STATUS.OK,
      message: 'signed out successfully.',
    };
  }

  const tokenHash = req.headers.tokenHash;

  const accessTokenKey = getAccessTokenKey(id, tokenHash);
  const refreshTokenKey = getRefreshTokenKey(id, tokenHash);

  await del([accessTokenKey, refreshTokenKey]);

  return {
    code: HTTP_STATUS.OK,
    message: 'signed out successfully.',
  };
};

export default {
  login,
  logout,
};
