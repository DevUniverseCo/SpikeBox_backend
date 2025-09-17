import { Type } from "@sinclair/typebox";
import { BaseSchema } from "../..";
import { CountryEnum } from "../../../../../application/common/enums/countryEnum";
import { GenderEnum } from "../../../../../application/common/enums/genderEnum";
import { HandednessEnum } from "../../../../../application/common/enums/handednessEnum";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../commons/bodies";
import { History } from "../histories/bodies";

export const CreatePlayer = Type.Object({
  firstName: Type.String(),
  lastName: Type.String(),
  birthDate: Type.Optional(Type.String({ format: "date" })),
  gender: Type.Optional(Type.Enum(GenderEnum)),
  heightCm: Type.Optional(Type.Number({ minimum: 50, maximum: 250 })),
  weightKg: Type.Optional(Type.Number({ minimum: 20, maximum: 200 })),
  country: Type.Optional(Type.Enum(CountryEnum)),
  handedness: Type.Optional(Type.Enum(HandednessEnum)),
  biography: Type.Optional(Type.String()),
  profileImageUrl: Type.Optional(Type.String({ format: "uri" })),
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

export const SeedPlayer = Type.Array(CreatePlayer);

export const UpdatePlayer = Type.Partial(CreatePlayer);

export const Player = Type.Intersect([BaseSchema.Bodies.Base, CreatePlayer]);
export const PlayerArray = Type.Array(Player);

export const PlayerWithExperiences = Type.Intersect([
  Player,
  Type.Object({
    experiences: Type.Array(History),
  }),
]);

export const PlayerResponseSingle = DataResponseSingleType(Player);
export const PlayerResponseArray = DataResponseArrayType(Player);
