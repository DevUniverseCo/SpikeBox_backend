import { ObjectId } from "mongodb";
import { Player } from "../../domain/entities/player";

export type PlayerDocument = Omit<Player, "fullName" | "id"> & {
  _id?: ObjectId;
  locked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export class PlayerMapper {
  static toPersistence(player: Player): PlayerDocument {
    return {
      firstName: player.firstName,
      lastName: player.lastName,
      role: player.role,
      biography: player.biography,
      birthDate: player.birthDate,
      nationality: player.nationality,
      gender: player.gender,
      height: player.height,
      weight: player.weight,
      thumbnailUrl: player.thumbnailUrl,
      socialLinks: player.socialLinks,
      locked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static toDomain(doc: PlayerDocument): Player {
    return new Player({
      id: doc._id?.toHexString(),
      firstName: doc.firstName,
      lastName: doc.lastName,
      role: doc.role,
      biography: doc.biography,
      birthDate: doc.birthDate,
      nationality: doc.nationality,
      gender: doc.gender,
      height: doc.height,
      weight: doc.weight,
      thumbnailUrl: doc.thumbnailUrl,
      socialLinks: doc.socialLinks,
    });
  }
}
