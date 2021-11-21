/*
  Warnings:

  - You are about to drop the `Provider` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[github_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
DROP TABLE "Provider";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_github_id_key" ON "User"("github_id");
