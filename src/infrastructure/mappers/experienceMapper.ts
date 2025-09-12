import { ObjectId } from "mongodb";
import { Experience } from "../../domain/entities/experience";

export type ExperienceDocument = Omit<Experience, "id"> & {
  _id?: ObjectId;
  locked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export class ExperienceMapper {
  static toPersistence(experience: Experience): ExperienceDocument {
    return {
      playerId: experience.playerId,
      clubId: experience.clubId,
      jerseyNumber: experience.jerseyNumber,
      league: experience.league,
      season: experience.season,
      role: experience.role,
      locked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static toDomain(doc: ExperienceDocument): Experience {
    return new Experience({
      id: doc._id?.toHexString(),
      playerId: doc.playerId,
      clubId: doc.clubId,
      jerseyNumber: doc.jerseyNumber,
      league: doc.league,
      season: doc.season,
      role: doc.role,
    });
  }
}
