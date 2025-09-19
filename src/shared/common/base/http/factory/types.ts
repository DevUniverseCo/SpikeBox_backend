import { FastifyInstance } from "fastify";

export type CrudSchemas = {
  get: object;
  getAll: object;
  post: object;
  patch: object;
  delete: object;
};

export type EntityDefinition<T> = {
  type: T;
  service: (app: FastifyInstance) => any;
  schemas: CrudSchemas;
};
