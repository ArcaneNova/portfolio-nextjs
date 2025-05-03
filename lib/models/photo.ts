import mongoose, { Schema } from "mongoose";

interface Photo {
  title: string;
  caption: string;
  category: string;
  imageUrl: string;
  date: Date;
  published: boolean;
}

const photoSchema = new Schema<Photo>(
  {
    title: { type: String, required: true },
    caption: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    date: { type: Date, default: Date.now },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Photo || mongoose.model<Photo>("Photo", photoSchema); 