-- Alter the table to add the new column with a temporary default value
ALTER TABLE "ProductDetail" ADD COLUMN "image_name" TEXT DEFAULT 'default_image';

-- Update existing rows to set the temporary default value
UPDATE "ProductDetail" SET "image_name" = 'default_image' WHERE "image_name" IS NULL;

-- Alter the table to remove the default value from the new column
ALTER TABLE "ProductDetail" ALTER COLUMN "image_name" DROP DEFAULT;
