/*
  Warnings:

  - Added the required column `title` to the `Contacts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contacts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "title" TEXT NOT NULL
);
INSERT INTO "new_Contacts" ("id", "slug", "value") SELECT "id", "slug", "value" FROM "Contacts";
DROP TABLE "Contacts";
ALTER TABLE "new_Contacts" RENAME TO "Contacts";
CREATE UNIQUE INDEX "Contacts_slug_key" ON "Contacts"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
