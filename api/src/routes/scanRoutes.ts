import { FastifyInstance } from 'fastify';
import { ScanService } from '../services/scanService';

export function registerScanRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: { take: number; skip: number } }>('/scans', {
    handler: async (request, reply) => {
      const service = new ScanService();
      const res = await service.getAll(request.query.take, request.query.skip);
      reply.send(res);
    },
    schema: {
      querystring: {
        take: { type: 'number' },
        skip: { type: 'number' },
      },
    },
  });

  fastify.post<{ Body: { url: string } }>('/scans', {
    handler: async (request, reply) => {
      const service = new ScanService();
      const res = await service.scan(request.body.url);
      reply.send(res);
    },
    schema: {
      body: {
        url: { type: 'string' },
      },
    },
  });
}
