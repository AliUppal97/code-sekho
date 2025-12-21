// ============================================================================
// Slug Utilities
// Generate URL-friendly slugs
// ============================================================================

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export async function ensureUniqueSlug(
  baseSlug: string,
  checkUnique: (slug: string) => Promise<boolean>,
  maxAttempts = 10,
): Promise<string> {
  let slug = baseSlug;
  let attempt = 0;

  while (attempt < maxAttempts) {
    const isUnique = await checkUnique(slug);
    if (isUnique) {
      return slug;
    }
    attempt++;
    slug = `${baseSlug}-${attempt}`;
  }

  // Fallback to timestamp if max attempts reached
  return `${baseSlug}-${Date.now()}`;
}


