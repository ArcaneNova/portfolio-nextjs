import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  slug: string;
  category: string;
  readTime: number;
  views: number;
  likes: number;
  date: Date;
  tags: string[];
}

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogPostCard({ post, featured }: BlogPostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`}>
      <div
        className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full bg-card cursor-pointer ${
          featured ? "lg:col-span-2" : ""
        }`}
      >
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <div className="p-6">
          {/* Category & Read Time */}
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
              {post.category}
            </span>
            <span className="text-xs text-muted-foreground">
              ⏱️ {post.readTime} min read
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-xs text-muted-foreground">{formattedDate}</div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>👁️ {post.views}</span>
              <span>❤️ {post.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
