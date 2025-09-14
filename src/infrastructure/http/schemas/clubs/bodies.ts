import { Type } from "@sinclair/typebox";
import { DataResponseArray, DataResponseSingle } from "../commons/bodies";

export const CreateClub = Type.Object({
  name: Type.String(),
  city: Type.Optional(Type.String()),
  country: Type.Optional(Type.String()),
  foundationYear: Type.Optional(Type.Number()),
  website: Type.Optional(Type.String({ format: "uri" })),
  logoUrl: Type.Optional(Type.String({ format: "uri" })),
  socialLinks: Type.Optional(
    Type.Object({
      twitter: Type.Optional(Type.String({ format: "uri" })),
      instagram: Type.Optional(Type.String({ format: "uri" })),
      facebook: Type.Optional(Type.String({ format: "uri" })),
    })
  ),
});

export const UpdateClub = Type.Partial(CreateClub);

export const Club = Type.Intersect([
  Type.Object({
    _id: Type.Optional(Type.String()),
    locked: Type.Boolean(),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  }),
  CreateClub,
]);

export const ClubResponseSingle = DataResponseSingle(Club);
export const ClubResponseArray = DataResponseArray(Club);
