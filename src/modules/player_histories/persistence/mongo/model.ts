import { model, Schema } from "mongoose";
import { PositionEnum } from "../../../../shared/common/enums/positionEum";
import { PlayerHistory } from "../../domain";

export type PlayerHistoryDocument = PlayerHistory & Document;

const PlayerHistorySchema = new Schema<PlayerHistoryDocument>(
  {
    player: { type: Schema.Types.ObjectId, ref: "Player", required: true },
    team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    season: { type: Schema.Types.ObjectId, ref: "Season", required: true },
    position: {
      type: String,
      enum: Object.values(PositionEnum),
      required: true,
    },
    jerseyNumber: { type: Number },
    isCaptain: { type: Boolean, default: false },
    locked: { type: Boolean, default: false },
    lockedAt: { type: Date },
  },
  { timestamps: true }
);

export const PlayerHistoryModel = model<PlayerHistoryDocument>(
  "PlayerHistory",
  PlayerHistorySchema
);
