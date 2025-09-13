import { Type } from "@sinclair/typebox";
import { GenderEnum } from "../../../../application/common/enums/genderEnum";
import { PlayerRoleEnum } from "../../../../application/common/enums/playerRoleEum";
import { Experience } from "../experiences/bodies";

export const CreatePlayer = Type.Object({
  firstName: Type.String(),
  lastName: Type.String(),
  role: Type.Enum(PlayerRoleEnum),
  biography: Type.Optional(Type.String()),
  birthDate: Type.Optional(Type.String({ format: "date" })),
  nationality: Type.Optional(Type.String()),
  gender: Type.Optional(Type.Enum(GenderEnum)),
  thumbnailUrl: Type.Optional(Type.String({ format: "uri" })),
  socialLinks: Type.Optional(
    Type.Object({
      twitter: Type.Optional(Type.String({ format: "uri" })),
      instagram: Type.Optional(Type.String({ format: "uri" })),
      facebook: Type.Optional(Type.String({ format: "uri" })),
    })
  ),
});

export const UpdatePlayer = Type.Partial(CreatePlayer);

export const Player = Type.Intersect([
  Type.Object({
    _id: Type.String(),
    locked: Type.Boolean(),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  }),
  CreatePlayer,
]);

export const Players = Type.Array(Player);

export const PlayerWithExperiences = Type.Intersect([
  Player,
  Type.Object({
    experiences: Type.Array(Experience),
  }),
]);

// Schema per UpdatePlayer (tutti i campi opzionali)
// export const PlayersPaginated = CommonSchema.Bodies.PaginationResult(Player);
