import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";
import { copyFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
  let url = process.env.DATABASE_URL ?? "file:./prisma/dev.db";

  if (process.env.VERCEL) {
    const temporaryDatabase = join(tmpdir(), "week15-2025-demo.db");
    if (!existsSync(temporaryDatabase)) {
      copyFileSync(join(process.cwd(), "prisma", "dev.db"), temporaryDatabase);
    }
    url = `file:${temporaryDatabase}`;
  }

  const adapter = new PrismaBetterSqlite3({
    url,
    readonly: false,
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
