import { Type } from "@sinclair/typebox";
import { GenderEnum } from "../../../../domain/common/enums/genderEnum";
import { PlayerRoleEnum } from "../../../../domain/common/enums/playerRoleEum";

// Schema TypeBox per creare un Player
export const CreatePlayerBody = Type.Object({
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
