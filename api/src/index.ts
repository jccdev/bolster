import _fastify from 'fastify';

const fastify = _fastify({ logger: true });

fastify.get('/', async (request, reply) => {
    reply.send('Welcome!');
});

(async function () {
    try {
        await fastify.listen({ port: 3000 });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})();

