-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_contact_id_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "contact_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
