import { Type } from "@sinclair/typebox";
import { CommonSchemas } from "..";
import { GenderEnum } from "../../../../application/common/enums/genderEnum";
import { PlayerRoleEnum } from "../../../../application/common/enums/playerRoleEum";

// Schema TypeBox per creare un Player
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

// Schema per Player (con campi aggiuntivi)
export const Player = Type.Intersect([
  Type.Object({
    _id: Type.Optional(Type.String()),
    locked: Type.Boolean(),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  }),
  CreatePlayer,
]);

// Schema per UpdatePlayer (tutti i campi opzionali)
export const PlayersPaginated = CommonSchemas.Bodies.PaginationResult(Player);
