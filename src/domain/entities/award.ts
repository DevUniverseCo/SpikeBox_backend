import { EntityEnum } from "../common/enums/entityEnum";
import { Season } from "./season";

export type Award = {
  title: string;
  description: string;
  entity: EntityEnum;
  season?: Season;
  thumbnailUrl?: string;
};
