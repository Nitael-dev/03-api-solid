/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `check_ins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gyms` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
DROP COLUMN "password_hash",
ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "check_ins";

-- DropTable
DROP TABLE "gyms";
