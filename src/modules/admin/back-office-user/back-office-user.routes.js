import controller from './back-office-user.controller.js';
import schema from './back-office-user.swagger.js';

const backOfficeUserRoutes = (fastify, options, done) => {
  fastify.post('/login', { schema: schema.login }, controller.login);
  fastify.post(
    '/logout',
    {
      schema: schema.logout,
      onRequest: [fastify.authenticateAccess],
    },
    controller.logout
  );

  done();
};

export default backOfficeUserRoutes;
