import _fastify from 'fastify';
import { registerScanRoutes } from './routes/scanRoutes';
import cors from '@fastify/cors';

const fastify = _fastify({ logger: true });

fastify.get('/', async (request, reply) => {
  reply.send('Welcome!');
});

registerScanRoutes(fastify);

(async function () {
  try {
    await fastify.register(cors, {
      origin: '*', // todo need to set this properly
    });
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
