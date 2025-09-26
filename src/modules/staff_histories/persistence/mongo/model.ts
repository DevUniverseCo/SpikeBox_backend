import { Schema, model } from "mongoose";
import { OfficeEnum } from "../../../../shared/common/enums/officeEnum";
import { StaffHistory } from "../../domain";

export type StaffHistoryDocument = StaffHistory & Document;

const StaffHistorySchema = new Schema<StaffHistoryDocument>(
  {
    staff: { type: Schema.Types.ObjectId, ref: "Staff", required: true },
    team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    season: { type: Schema.Types.ObjectId, ref: "Season", required: true },
    office: {
      type: [{ type: String, enum: Object.values(OfficeEnum) }],
      required: true,
    },
    locked: { type: Boolean, default: false },
    lockedAt: { type: Date },
  },
  { timestamps: true }
);

export const StaffHistoryModel = model<StaffHistoryDocument>(
  "StaffHistory",
  StaffHistorySchema
);
