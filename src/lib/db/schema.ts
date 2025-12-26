import { sqliteTable, text, integer, real, index, uniqueIndex } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// --------------------
// USERS
// --------------------
export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(), // use crypto.randomUUID() at create time
    name: text("name"),
    email: text("email"),
    emailVerified: integer("email_verified", { mode: "timestamp" }),
    image: text("image"),

    username: text("username"),
    hashedPassword: text("hashed_password"),

    bio: text("bio"),
    location: text("location"),

    theme: text("theme").notNull().default("light"),
    measurementUnit: text("measurement_unit").notNull().default("imperial"),

    points: integer("points").notNull().default(0),
    level: integer("level").notNull().default(1),

    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  },
  (t) => ({
    emailIdx: uniqueIndex("users_email_uq").on(t.email),
    usernameIdx: uniqueIndex("users_username_uq").on(t.username),
  })
);

// Optional: dietary preferences normalized (portable vs String[])
export const dietaryPrefs = sqliteTable(
  "dietary_prefs",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull(), // e.g. "dairy-free"
    name: text("name").notNull(), // e.g. "Dairy Free"
  },
  (t) => ({
    slugIdx: uniqueIndex("dietary_prefs_slug_uq").on(t.slug),
  })
);

export const userDietaryPrefs = sqliteTable(
  "user_dietary_prefs",
  {
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    prefId: text("pref_id").notNull().references(() => dietaryPrefs.id, { onDelete: "cascade" }),
  },
  (t) => ({
    uq: uniqueIndex("udp_uq").on(t.userId, t.prefId),
    userIdx: index("udp_user_idx").on(t.userId),
  })
);

// --------------------
// RECIPES
// --------------------
export const recipes = sqliteTable(
  "recipes",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull(),

    title: text("title").notNull(),
    description: text("description"),

    authorId: text("author_id").notNull().references(() => users.id, { onDelete: "cascade" }),

    creamiProgram: text("creami_program").notNull(), // "Ice Cream", "Sorbet", etc.
    difficulty: text("difficulty").notNull().default("medium"), // easy|medium|hard
    visibility: text("visibility").notNull().default("public"), // public|private|friends

    prepTimeMin: integer("prep_time_min"),
    freezeTimeMin: integer("freeze_time_min"),
    servings: integer("servings").notNull().default(1),

    // nutrition optional
    calories: integer("calories"),
    protein: real("protein"),
    carbs: real("carbs"),
    fat: real("fat"),
    sugar: real("sugar"),

    // counters (optional; OK if you commit to updating them)
    views: integer("views").notNull().default(0),
    likesCount: integer("likes_count").notNull().default(0),
    savesCount: integer("saves_count").notNull().default(0),
    commentsCount: integer("comments_count").notNull().default(0),

    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  },
  (t) => ({
    slugUq: uniqueIndex("recipes_slug_uq").on(t.slug),
    authorIdx: index("recipes_author_idx").on(t.authorId),
    createdIdx: index("recipes_created_idx").on(t.createdAt),
    visibilityIdx: index("recipes_visibility_idx").on(t.visibility),
  })
);

// Ingredients normalized (search-friendly)
export const recipeIngredients = sqliteTable(
  "recipe_ingredients",
  {
    id: text("id").primaryKey(),
    recipeId: text("recipe_id").notNull().references(() => recipes.id, { onDelete: "cascade" }),
    name: text("name").notNull(),

    // store both human + normalized amounts when available
    amount: real("amount"),
    unit: text("unit"),
    grams: real("grams"),

    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => ({
    recipeIdx: index("ri_recipe_idx").on(t.recipeId),
    nameIdx: index("ri_name_idx").on(t.name),
  })
);

export const recipeSteps = sqliteTable(
  "recipe_steps",
  {
    id: text("id").primaryKey(),
    recipeId: text("recipe_id").notNull().references(() => recipes.id, { onDelete: "cascade" }),
    text: text("text").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => ({
    recipeIdx: index("rs_recipe_idx").on(t.recipeId),
  })
);

// Images (store R2 URL or key)
export const recipeImages = sqliteTable(
  "recipe_images",
  {
    id: text("id").primaryKey(),
    recipeId: text("recipe_id").notNull().references(() => recipes.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  },
  (t) => ({
    recipeIdx: index("rimg_recipe_idx").on(t.recipeId),
  })
);

// Tags normalized (fast filtering)
export const tags = sqliteTable(
  "tags",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
  },
  (t) => ({
    slugUq: uniqueIndex("tags_slug_uq").on(t.slug),
  })
);

export const recipeTags = sqliteTable(
  "recipe_tags",
  {
    recipeId: text("recipe_id").notNull().references(() => recipes.id, { onDelete: "cascade" }),
    tagId: text("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => ({
    uq: uniqueIndex("recipe_tags_uq").on(t.recipeId, t.tagId),
    recipeIdx: index("recipe_tags_recipe_idx").on(t.recipeId),
    tagIdx: index("recipe_tags_tag_idx").on(t.tagId),
  })
);

// --------------------
// SOCIAL INTERACTIONS (MVP)
// --------------------
export const likes = sqliteTable(
  "likes",
  {
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    recipeId: text("recipe_id").notNull().references(() => recipes.id, { onDelete: "cascade" }),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  },
  (t) => ({
    uq: uniqueIndex("likes_uq").on(t.userId, t.recipeId),
    recipeIdx: index("likes_recipe_idx").on(t.recipeId),
  })
);

export const ratings = sqliteTable(
  "ratings",
  {
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    recipeId: text("recipe_id").notNull().references(() => recipes.id, { onDelete: "cascade" }),
    rating: integer("rating").notNull(), // 1-5
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  },
  (t) => ({
    uq: uniqueIndex("ratings_uq").on(t.userId, t.recipeId),
    recipeIdx: index("ratings_recipe_idx").on(t.recipeId),
  })
);

export const comments = sqliteTable(
  "comments",
  {
    id: text("id").primaryKey(),
    recipeId: text("recipe_id").notNull().references(() => recipes.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  },
  (t) => ({
    recipeIdx: index("comments_recipe_idx").on(t.recipeId),
    userIdx: index("comments_user_idx").on(t.userId),
  })
);

// --------------------
// SAVES + COLLECTIONS (optional MVP)
// --------------------
export const savedRecipes = sqliteTable(
  "saved_recipes",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    recipeId: text("recipe_id").notNull().references(() => recipes.id, { onDelete: "cascade" }),
    notes: text("notes"),
    savedAt: integer("saved_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  },
  (t) => ({
    uq: uniqueIndex("saved_recipes_uq").on(t.userId, t.recipeId),
    userIdx: index("saved_recipes_user_idx").on(t.userId),
    recipeIdx: index("saved_recipes_recipe_idx").on(t.recipeId),
  })
);

export const collections = sqliteTable(
  "collections",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  },
  (t) => ({
    userIdx: index("collections_user_idx").on(t.userId),
  })
);

export const collectionRecipes = sqliteTable(
  "collection_recipes",
  {
    collectionId: text("collection_id").notNull().references(() => collections.id, { onDelete: "cascade" }),
    savedRecipeId: text("saved_recipe_id").notNull().references(() => savedRecipes.id, { onDelete: "cascade" }),
    addedAt: integer("added_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  },
  (t) => ({
    uq: uniqueIndex("collection_recipes_uq").on(t.collectionId, t.savedRecipeId),
    collectionIdx: index("collection_recipes_collection_idx").on(t.collectionId),
  })
);