import { defineConfig } from "prisma/config"

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Uses DATABASE_URL provided via env; empty string lets non-DB commands run without failing
    url: process.env.DATABASE_URL ?? "",
  },
})
