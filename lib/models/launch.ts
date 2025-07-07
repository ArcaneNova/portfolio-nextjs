import { Schema, model, models } from "mongoose";

const LaunchSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    imageUrl: {
      type: String,
      default: "/placeholder.jpg",
    },
    launchDate: {
      type: Date,
      required: [true, "Launch date is required"],
      default: Date.now,
    },
    projectUrl: {
      type: String,
      required: [true, "Project URL is required"],
    },
    tags: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Launched", "Launching Soon"],
      default: "Launching Soon",
    },
  },
  { timestamps: true }
);

const Launch = models.Launch || model("Launch", LaunchSchema);

export default Launch;
