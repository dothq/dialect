-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "author_id" INTEGER NOT NULL DEFAULT -1,
ADD COLUMN     "contact_id" INTEGER NOT NULL DEFAULT -1,
ADD COLUMN     "description" TEXT;
