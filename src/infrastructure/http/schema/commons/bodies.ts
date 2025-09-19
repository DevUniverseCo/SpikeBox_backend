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
