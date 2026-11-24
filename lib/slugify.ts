/** Turns heading text into a URL-safe anchor id ("Lesson 1: Never trust…" → "lesson-1-never-trust"). */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
