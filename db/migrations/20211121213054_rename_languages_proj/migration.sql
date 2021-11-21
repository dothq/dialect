/*
  Warnings:

  - You are about to drop the column `projectId` on the `Language` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `project_id` to the `Language` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Language" DROP CONSTRAINT "Language_projectId_fkey";

-- AlterTable
ALTER TABLE "Language" DROP COLUMN "projectId",
ADD COLUMN     "project_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
