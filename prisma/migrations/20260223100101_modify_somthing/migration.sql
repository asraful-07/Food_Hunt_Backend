/*
  Warnings:

  - You are about to drop the column `restaurantName` on the `provider` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "provider_restaurantName_key";

-- AlterTable
ALTER TABLE "provider" DROP COLUMN "restaurantName";
