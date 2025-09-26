import { Base } from "../../shared/common/base/domain";

export type CreateAchievement = {
  name: string;
  description?: string;
  achievedAt: Date;
  seasonId: string;
  playerId?: string;
  teamId?: string;
  staffId?: string;
};

export type Achievement = Base & CreateAchievement;
export type UpdateAchievement = Partial<CreateAchievement>;
