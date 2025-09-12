import { ObjectId } from "mongodb";
import { Club } from "../../domain/entities/club";

export type ClubDocument = Omit<Club, "id"> & {
  _id?: ObjectId;
  locked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export class ClubMapper {
  static toPersistence(club: Club): ClubDocument {
    return {
      name: club.name,
      city: club.city,
      country: club.country,
      foundationYear: club.foundationYear,
      website: club.website,
      logoUrl: club.logoUrl,
      socialLinks: club.socialLinks,
      locked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static toDomain(doc: ClubDocument): Club {
    return new Club({
      id: doc._id?.toHexString(),
      name: doc.name,
      city: doc.city,
      country: doc.country,
      foundationYear: doc.foundationYear,
      website: doc.website,
      logoUrl: doc.logoUrl,
      socialLinks: doc.socialLinks,
    });
  }
}
