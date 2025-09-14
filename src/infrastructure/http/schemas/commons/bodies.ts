import { TSchema, Type } from "@sinclair/typebox";

// ✅ Wrapper per un singolo oggetto
export const DataResponseSingle = <T extends TSchema>(schema: T) =>
  Type.Object({
    message: Type.String(),
    data: schema,
  });

// ✅ Wrapper per un array di oggetti
export const DataResponseArray = <T extends TSchema>(schema: T) =>
  Type.Object({
    message: Type.String(),
    data: Type.Array(schema),
  });
