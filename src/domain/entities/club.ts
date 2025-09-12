import { SocialLinks } from "../common/enums/socialEnum";

export class Club {
  public readonly id?: string;
  public readonly name: string;

  public city?: string;
  public country?: string;
  public foundationYear?: number;
  public website?: string;
  public logoUrl?: string;
  public socialLinks?: SocialLinks;

  constructor(props: {
    id?: string;
    name: string;
    city?: string;
    country?: string;
    foundationYear?: number;
    website?: string;
    logoUrl?: string;
    socialLinks?: SocialLinks;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.city = props.city;
    this.country = props.country;
    this.foundationYear = props.foundationYear;
    this.website = props.website;
    this.logoUrl = props.logoUrl;
    this.socialLinks = props.socialLinks;

    this.validate();
  }

  private validate(): void {
    if (!this.name) {
      throw new Error("A club must have a name.");
    }

    if (this.foundationYear && this.foundationYear > new Date().getFullYear()) {
      throw new Error("Foundation year cannot be in the future.");
    }
  }
}
