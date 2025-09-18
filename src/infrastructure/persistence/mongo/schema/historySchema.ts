import { model, Schema } from "mongoose";
import { PositionEnum } from "../../../../application/common/enums/positionEum";
import { History } from "../../../../application/entities/history";

export type HistoryDocument = History & Document;

const HistorySchema = new Schema<HistoryDocument>(
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
    locked: { type: Boolean, default: false }, // dal Base
    lockedAt: { type: Date },
  },
  { timestamps: true } // createdAt e updatedAt automatici
);

export const HistoryModel = model<HistoryDocument>("History", HistorySchema);
