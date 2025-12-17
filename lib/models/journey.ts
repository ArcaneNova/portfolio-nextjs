import mongoose, { Schema, Document } from 'mongoose';

export interface IJourney extends Document {
  year: string;
  title: string;
  description: string;
  achievement: string;
  color: string;
  icon: string;
  image: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const JourneySchema = new Schema<IJourney>(
  {
    year: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    achievement: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
      default: 'from-blue-400 to-indigo-600',
    },
    icon: {
      type: String,
      required: true,
      default: '💻',
    },
    image: {
      type: String,
      default: '/placeholder.jpg',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Journey || mongoose.model<IJourney>('Journey', JourneySchema);
