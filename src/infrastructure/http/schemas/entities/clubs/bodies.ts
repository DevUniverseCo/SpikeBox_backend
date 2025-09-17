import { Type } from "@sinclair/typebox";
import { BaseSchema } from "../..";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../commons/bodies";

export const CreateClub = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
  foundationYear: Type.Optional(Type.Number()),
  clubImageUrl: Type.Optional(Type.String({ format: "uri" })),
  contact: Type.Optional(
    Type.Object({
      phone: Type.Optional(Type.String()),
      email: Type.Optional(Type.String({ format: "email" })),
      address: Type.Optional(Type.String()),
      website: Type.Optional(Type.String({ format: "uri" })),
    })
  ),
  platform: Type.Optional(
    Type.Object({
      instagram: Type.Optional(Type.String({ format: "uri" })),
      facebook: Type.Optional(Type.String({ format: "uri" })),
      twitter: Type.Optional(Type.String({ format: "uri" })),
      youtube: Type.Optional(Type.String({ format: "uri" })),
      tiktok: Type.Optional(Type.String({ format: "uri" })),
    })
  ),
});
export const SeedClub = Type.Array(CreateClub);

export const UpdateClub = Type.Partial(CreateClub);
export const ClubArray = Type.Array(CreateClub);

export const Club = Type.Intersect([BaseSchema.Bodies.Base, CreateClub]);

export const ClubResponseSingle = DataResponseSingleType(Club);
export const ClubResponseArray = DataResponseArrayType(Club);
