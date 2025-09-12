import { GenderEnum } from "./common/enums/genderEnum";
import { PlayerRoleEnum } from "./common/enums/playerRoleEum";
import { SocialLinks } from "./common/enums/socialEnum";

export class Player {
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly role: PlayerRoleEnum;

  public biography?: string;
  public birthDate?: string;
  public nationality?: string;
  public gender?: GenderEnum;
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
    thumbnailUrl?: string;
    socialLinks?: SocialLinks;
  }) {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.role = props.role;

    this.biography = props.biography;
    this.birthDate = props.birthDate;
    this.nationality = props.nationality;
    this.gender = props.gender;
    this.thumbnailUrl = props.thumbnailUrl;
    this.socialLinks = props.socialLinks;
  }
}
