import { and, desc, eq, inArray, like } from "drizzle-orm";
import { recipes, recipeImages, recipeTags, tags } from "./schema";
import { getDb } from "./client";

export async function listRecipes(env: { DB: D1Database }, args: {
  q?: string;
  tagSlugs?: string[];
  limit?: number;
}) {
  const db = getDb(env);
  const limit = args.limit ?? 24;

  // Optional search by title
  const where = args.q ? like(recipes.title, `%${args.q}%`) : undefined;

  // Optional tag filter
  if (args.tagSlugs?.length) {
    const tagRows = await db.select({ id: tags.id }).from(tags).where(inArray(tags.slug, args.tagSlugs));
    const tagIds = tagRows.map(t => t.id);

    // Find recipes having ANY of selected tags (MVP)
    const rt = await db
      .select({ recipeId: recipeTags.recipeId })
      .from(recipeTags)
      .where(inArray(recipeTags.tagId, tagIds));

    const recipeIds = [...new Set(rt.map(r => r.recipeId))];
    if (!recipeIds.length) return [];

    return db
      .select()
      .from(recipes)
      .where(and(where, inArray(recipes.id, recipeIds)))
      .orderBy(desc(recipes.createdAt))
      .limit(limit);
  }

  return db
    .select()
    .from(recipes)
    .where(where)
    .orderBy(desc(recipes.createdAt))
    .limit(limit);
}

export async function getRecipeBySlug(env: { DB: D1Database }, slug: string) {
  const db = getDb(env);

  const [r] = await db.select().from(recipes).where(eq(recipes.slug, slug)).limit(1);
  if (!r) return null;

  const imgs = await db
    .select()
    .from(recipeImages)
    .where(eq(recipeImages.recipeId, r.id))
    .orderBy(recipeImages.sortOrder);

  return { recipe: r, images