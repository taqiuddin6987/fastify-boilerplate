import backOfficeUserRoutes from './back-office-user/back-office-user.routes.js';

const adminRoutes = (fastify, options, done) => {
  fastify.register(backOfficeUserRoutes, { prefix: '/back-office-user' });

  done();
};

export default adminRoutes;
