import { GenderEnum } from "../common/enums/genderEnum";
import { PlayerRoleEnum } from "../common/enums/playerRoleEum";
import { SocialLinks } from "../common/enums/socialEnum";
import { Measurement } from "./measurement";

export class Player {
  public readonly id?: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly role: PlayerRoleEnum;

  public fullName: string;
  public biography?: string;
  public birthDate?: string;
  public nationality?: string;
  public gender?: GenderEnum;
  public height?: Measurement;
  public weight?: Measurement;
  public thumbnailUrl?: string;
  public socialLinks?: SocialLinks;

  constructor(props: {
    id?: string;
    firstName: string;
    lastName: string;
    role: PlayerRoleEnum;
    biography?: string;
    birthDate?: string;
    nationality?: string;
    gender?: GenderEnum;
    height?: Measurement;
    weight?: Measurement;
    thumbnailUrl?: string;
    socialLinks?: SocialLinks;
  }) {
    this.id = props.id;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.role = props.role;

    this.fullName = `${props.firstName} ${props.lastName}`;
    this.biography = props.biography;
    this.birthDate = props.birthDate;
    this.nationality = props.nationality;
    this.gender = props.gender;
    this.height = props.height;
    this.weight = props.weight;
    this.thumbnailUrl = props.thumbnailUrl;
    this.socialLinks = props.socialLinks;

    this.validate();
  }

  private validate(): void {
    if (!this.firstName || !this.lastName) {
      throw new Error("A player must have both firstName and lastName.");
    }
    if (this.birthDate) {
      const birth = new Date(this.birthDate);
      if (birth > new Date()) {
        throw new Error("Birthdate cannot be in the future.");
      }
    }
  }
}
