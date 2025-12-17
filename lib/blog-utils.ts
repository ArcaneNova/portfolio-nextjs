/**
 * Calculate estimated read time for a blog post
 * @param content - The blog post content
 * @param wordsPerMinute - Average reading speed (default: 200 words per minute)
 * @returns Estimated read time in minutes
 */
export function calculateReadTime(
  content: string,
  wordsPerMinute: number = 200
): number {
  const words = content.split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return Math.max(1, readTime); // Minimum 1 minute
}

/**
 * Generate a slug from a title
 * @param title - The title to slugify
 * @returns URL-friendly slug
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Generate table of contents from blog content
 * @param content - The blog post content (markdown or HTML)
 * @returns Array of table of contents items with IDs
 */
export function generateTableOfContents(
  content: string
): Array<{ level: number; text: string; id: string }> {
  const headingRegex = /^(#{2,6})\s+(.+)$/gm;
  const toc: Array<{ level: number; text: string; id: string }> = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = generateSlug(text);

    toc.push({ level, text, id });
  }

  return toc;
}

/**
 * Extract excerpt from content
 * @param content - The full content
 * @param maxLength - Maximum length of excerpt (default: 160)
 * @returns Excerpt string
 */
export function extractExcerpt(
  content: string,
  maxLength: number = 160
): string {
  const cleanContent = content
    .replace(/^#+\s+.+$/gm, "") // Remove headers
    .replace(/[*_`]/g, "") // Remove markdown formatting
    .replace(/\n+/g, " ") // Replace newlines with spaces
    .trim();

  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }

  return cleanContent.substring(0, maxLength).trim() + "...";
}

/**
 * Format date for display
 * @param date - The date to format
 * @param locale - The locale for formatting (default: 'en-US')
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  locale: string = "en-US"
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Validate blog post data
 * @param post - The blog post object to validate
 * @returns Validation result with errors array
 */
export function validateBlogPost(post: any): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!post.title || typeof post.title !== "string" || post.title.trim() === "") {
    errors.push("Title is required and must be a non-empty string");
  }

  if (!post.content || typeof post.content !== "string" || post.content.trim() === "") {
    errors.push("Content is required and must be a non-empty string");
  }

  if (!post.excerpt || typeof post.excerpt !== "string") {
    errors.push("Excerpt is required");
  }

  if (!post.slug || typeof post.slug !== "string") {
    errors.push("Slug is required");
  }

  if (!post.category || typeof post.category !== "string") {
    errors.push("Category is required");
  }

  if (!post.imageUrl || typeof post.imageUrl !== "string") {
    errors.push("Image URL is required");
  }

  if (!Array.isArray(post.tags)) {
    errors.push("Tags must be an array");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
