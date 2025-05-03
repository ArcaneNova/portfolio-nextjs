import mongoose, { Schema } from "mongoose";

export interface ChallengeUpdate {
  day: number
  topic: string
  description: string
  date: string
  imageUrl?: string
}

export interface Challenge {
  _id?: string
  title: string
  description: string
  image: string
  startDate: string
  currentDay: number
  totalDays: number
  latestUpdate: ChallengeUpdate
  updates?: ChallengeUpdate[]
  createdAt?: Date
  updatedAt?: Date
}

export interface ChallengesResponse {
  challenges: Challenge[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

const challengeUpdateSchema = new Schema<ChallengeUpdate>({
  day: { type: Number, required: true },
  topic: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  imageUrl: { type: String },
});

const challengeSchema = new Schema<Challenge>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    startDate: { type: String, required: true },
    currentDay: { type: Number, required: true, default: 0 },
    totalDays: { type: Number, required: true },
    latestUpdate: { type: challengeUpdateSchema, required: false },
    updates: [challengeUpdateSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Challenge || mongoose.model<Challenge>("Challenge", challengeSchema);
