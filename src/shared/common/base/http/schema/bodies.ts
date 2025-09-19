import { TSchema, Type } from "@sinclair/typebox";

// ✅ Wrapper per un singolo oggetto
export const DataResponseSingleType = <T extends TSchema>(schema: T) =>
  Type.Object({
    message: Type.String(),
    data: schema,
  });

// ✅ Wrapper per un array di oggetti
export const DataResponseArrayType = <T extends TSchema>(schema: T) =>
  Type.Object({
    message: Type.String(),
    data: Type.Array(schema),
  });

// ✅ Schema di base comune a tutti gli oggetti
export const Base = Type.Intersect([
  Type.Object({
    _id: Type.String(),
    // locked: Type.Boolean({ default: false }),
    // createdAt: Type.String({ format: "date-time" }),
    // updatedAt: Type.String({ format: "date-time" }),
  }),
]);
