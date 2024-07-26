-- AlterTable
ALTER TABLE "products" ALTER COLUMN "stock" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "defaultBillingAddress" INTEGER,
ADD COLUMN     "defaultShippingAddress" INTEGER;
