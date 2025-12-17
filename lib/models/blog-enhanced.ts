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
  readTime: number;
  views: number;
  likes: number;
  relatedPosts: string[];
  seoDescription?: string;
  seoKeywords?: string[];
  tableOfContents?: Array<{
    level: number;
    text: string;
    id: string;
  }>;
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
    readTime: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    relatedPosts: [{ type: String }],
    seoDescription: { type: String },
    seoKeywords: [{ type: String }],
    tableOfContents: [
      {
        level: Number,
        text: String,
        id: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.BlogPost ||
  mongoose.model<BlogPost>("BlogPost", blogSchema);
