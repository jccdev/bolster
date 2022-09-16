import _fastify from 'fastify';
import {registerScanRoutes} from "./routes/scanRoutes";

const fastify = _fastify({ logger: true });

fastify.get('/', async (request, reply) => {
    reply.send('Welcome!');
});

registerScanRoutes(fastify);

(async function () {
    try {
        await fastify.listen({ port: 3000 });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})();

