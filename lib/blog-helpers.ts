import { calculateReadTime } from "@/lib/blog-utils";

/**
 * Utility function to add read time to blog posts before sending to client
 */
export function enrichBlogPostWithReadTime(post: any) {
  return {
    ...post,
    readTime: post.readTime || calculateReadTime(post.content),
  };
}

/**
 * Format multiple blog posts with read time
 */
export function enrichBlogPosts(posts: any[]) {
  return posts.map(enrichBlogPostWithReadTime);
}

/**
 * Generate sitemap entries for blog posts
 */
export function generateBlogSitemapEntries(posts: any[]) {
  return posts
    .filter((post) => post.published)
    .map((post) => ({
      url: `https://arshadnoor.me/blog/${post.slug}`,
      lastModified: post.updatedAt || post.date,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
}

/**
 * Get related posts based on tags and category
 */
export function getRelatedPosts(post: any, allPosts: any[], limit: number = 3) {
  const related = allPosts
    .filter(
      (p) =>
        p._id.toString() !== post._id.toString() &&
        (p.category === post.category ||
          p.tags.some((tag: string) => post.tags.includes(tag)))
    )
    .sort((a, b) => {
      // Prioritize same category
      const categoryMatch = b.category === post.category ? 1 : -1;
      // Then by common tags count
      const commonTags = b.tags.filter((tag: string) =>
        post.tags.includes(tag)
      ).length;
      return categoryMatch + commonTags;
    })
    .slice(0, limit);

  return related;
}
