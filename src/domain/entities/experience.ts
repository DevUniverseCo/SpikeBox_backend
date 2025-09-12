import { LeagueEnum } from "../common/enums/leagueEnum ";
import { PlayerRoleEnum } from "../common/enums/playerRoleEum";
import { Season } from "./season";

export class Experience {
  public readonly id?: string;
  public readonly playerId: string;
  public readonly league: LeagueEnum;
  public readonly season: Season;
  public readonly role: PlayerRoleEnum;

  public clubId?: string;
  public jerseyNumber?: number;

  constructor(props: {
    id?: string;
    playerId: string;
    league: LeagueEnum;
    season: Season;
    role: PlayerRoleEnum;
    clubId?: string;
    jerseyNumber?: number;
  }) {
    this.id = props.id;
    this.playerId = props.playerId;
    this.league = props.league;
    this.season = props.season;
    this.role = props.role;
    this.clubId = props.clubId;
    this.jerseyNumber = props.jerseyNumber;

    this.validate();
  }

  private validate(): void {
    if (!this.playerId) {
      throw new Error("Experience must reference a playerId.");
    }
    if (!this.league) {
      throw new Error("Experience must have a league.");
    }
    if (!this.season) {
      throw new Error("Experience must be linked to a season.");
    }
    if (!this.role) {
      throw new Error("Experience must have a role.");
    }
    if (this.jerseyNumber && this.jerseyNumber <= 0) {
      throw new Error("Jersey number must be greater than 0.");
    }
  }
}
