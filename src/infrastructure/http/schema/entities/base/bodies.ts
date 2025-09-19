import { Type } from "@sinclair/typebox";

export const Base = Type.Intersect([
  Type.Object({
    _id: Type.String(),
    // locked: Type.Boolean({ default: false }),
    // createdAt: Type.String({ format: "date-time" }),
    // updatedAt: Type.String({ format: "date-time" }),
  }),
]);
