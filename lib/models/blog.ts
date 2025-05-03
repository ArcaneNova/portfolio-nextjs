import mongoose, { Schema } from "mongoose";

interface BlogPost {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  author: string;
  category: string;
  imageUrl: string;
  date: Date;
  published: boolean;
  tags: string[];
}

const blogSchema = new Schema<BlogPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    date: { type: Date, default: Date.now },
    published: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.BlogPost || mongoose.model<BlogPost>("BlogPost", blogSchema); 