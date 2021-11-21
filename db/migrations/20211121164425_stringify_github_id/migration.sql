/*
  Warnings:

  - You are about to drop the column `userId` on the `Provider` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Provider" DROP CONSTRAINT "Provider_userId_fkey";

-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "github_id" TEXT;
