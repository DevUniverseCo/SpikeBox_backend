import { Type } from "@sinclair/typebox";

// Wrapper uniforme per errori
export const ApiErrorResponse = Type.Object({
  status: Type.Literal("error"),
  statusCode: Type.Number(),
  message: Type.String(),
});

// Esempi di schemi specifici
export const NotFound = Type.Intersect([
  ApiErrorResponse,
  Type.Object({
    statusCode: Type.Literal(404),
    message: Type.String({ default: "Not Found" }),
  }),
]);

export const InternalServerError = Type.Intersect([
  ApiErrorResponse,
  Type.Object({
    statusCode: Type.Literal(500),
    message: Type.String({ default: "Internal Server Error" }),
  }),
]);
