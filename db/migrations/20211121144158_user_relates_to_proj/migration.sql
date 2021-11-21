/*
  Warnings:

  - You are about to drop the column `maintainer_id` on the `Language` table. All the data in the column will be lost.
  - You are about to drop the column `translationId` on the `Language` table. All the data in the column will be lost.
  - You are about to drop the `Audio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Highlight` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Memory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Translation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `contact_id` to the `Language` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Highlight" DROP CONSTRAINT "Highlight_memoryId_fkey";

-- DropForeignKey
ALTER TABLE "Language" DROP CONSTRAINT "Language_translationId_fkey";

-- DropForeignKey
ALTER TABLE "Memory" DROP CONSTRAINT "Memory_translationId_fkey";

-- DropForeignKey
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_audioEngine_fkey";

-- DropForeignKey
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_category_id_fkey";

-- AlterTable
ALTER TABLE "Language" DROP COLUMN "maintainer_id",
DROP COLUMN "translationId",
ADD COLUMN     "contact_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "author_id" DROP DEFAULT,
ALTER COLUMN "author_id" SET DATA TYPE TEXT,
ALTER COLUMN "contact_id" DROP DEFAULT,
ALTER COLUMN "contact_id" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Audio";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Highlight";

-- DropTable
DROP TABLE "Memory";

-- DropTable
DROP TABLE "Translation";

-- CreateTable
CREATE TABLE "Provider" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatar_url" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
