/*
  Warnings:

  - You are about to drop the column `isOpen` on the `provider` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `provider_Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `provider_Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "provider" DROP COLUMN "isOpen";

-- AlterTable
ALTER TABLE "provider_Profile" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "provider_Profile_email_key" ON "provider_Profile"("email");
