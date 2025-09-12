import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { BaseUseCase } from "../../../../use-cases/baseUseCase";

export function getUseCase(
  entityMap: Record<string, BaseUseCase<any>>,
  entity: string
): BaseUseCase<any> {
  const useCase = entityMap[entity.toLowerCase()];
  if (!useCase) {
    const error: Error & { status?: number } = new Error(
      `Entity "${entity}" not found`
    );
    error.status = 404;
    throw error;
  }
  return useCase;
}

export async function registerBaseRoutes(
  app: FastifyInstance,
  entityMap: Record<string, BaseUseCase<any>>
) {
  const sendResponse = <T>(
    reply: FastifyReply,
    data: T,
    message: string,
    code = 200
  ) => reply.status(code).send({ code, message, data, success: code < 400 });

  app.get(
    "/:entity/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { entity, id } = request.params as { entity: string; id: string };
      const useCase = getUseCase(entityMap, entity);
      const result = await useCase.getById(id);
      if (!result) {
        const error: Error & { status?: number } = new Error(
          `${entity} with ID ${id} not found`
        );
        error.status = 404;
        throw error;
      }
      sendResponse(reply, result, `${entity} retrieved successfully`);
    }
  );

  app.get(
    "/:entity/list",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { entity } = request.params as { entity: string };
      const useCase = getUseCase(entityMap, entity);
      const results = await useCase.getList();
      sendResponse(
        reply,
        results ?? [],
        `${entity} list retrieved successfully`
      );
    }
  );

  app.post("/:entity", async (request: FastifyRequest, reply: FastifyReply) => {
    const { entity } = request.params as { entity: string };
    const useCase = getUseCase(entityMap, entity);
    const created = await useCase.create((request as any).body);
    sendResponse(reply, created, `${entity} created successfully`, 201);
  });

  app.put("/:entity", async (request: FastifyRequest, reply: FastifyReply) => {
    const { entity } = request.params as { entity: string };
    const useCase = getUseCase(entityMap, entity);
    const updated = await useCase.update((request as any).body);
    sendResponse(reply, updated, `${entity} updated successfully`, 200);
  });

  app.delete(
    "/:entity/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { entity, id } = request.params as { entity: string; id: string };
      const useCase = getUseCase(entityMap, entity);
      const success = await useCase.delete(id);
      if (!success) {
        const error: Error & { status?: number } = new Error(
          `${entity} not found`
        );
        error.status = 404;
        throw error;
      }
      sendResponse(reply, null, `${entity} deleted successfully`);
    }
  );
}
