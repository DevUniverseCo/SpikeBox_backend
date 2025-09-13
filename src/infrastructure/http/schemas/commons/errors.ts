import { Type } from "@sinclair/typebox";

// 404 Not Found
export const NotFound = Type.Object({
  error: Type.String({ default: "Not found" }),
});

// 500 Internal Server Error
export const InternalServerError = Type.Object({
  error: Type.String({ default: "Internal Server Error" }),
});
