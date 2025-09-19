import { CrudSchemas } from "./types";

export function createCrudSchemasFactory<T>(params: {
  typeSingle: object;
  typeArray: object;
  createBody: object;
  updateBody: object;
  deleteBody: object;
}): CrudSchemas {
  // ----------------- Costanti comuni -----------------
  const ErrorResponses = {
    404: BaseSchema.Errors.ApiErrorResponse,
    500: BaseSchema.Errors.ApiErrorResponse,
  };

  return {
    get: {
      params: BaseSchema.Params.Id,
      response: { 200: params.typeSingle, ...ErrorResponses },
    },
    getAll: {
      response: { 200: params.typeArray, ...ErrorResponses },
    },
    post: {
      body: params.createBody,
      response: { 201: params.createBody, ...ErrorResponses },
    },
    patch: {
      params: BaseSchema.Params.Id,
      body: params.updateBody,
      response: { 200: params.updateBody, ...ErrorResponses },
    },
    delete: {
      params: BaseSchema.Params.Id,
      response: { 204: { type: "boolean" }, ...ErrorResponses },
    },
  };
}
