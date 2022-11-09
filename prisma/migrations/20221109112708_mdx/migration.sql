-- DropIndex
DROP INDEX `Layout_mdx_key` ON `Layout`;

-- AlterTable
ALTER TABLE `Layout` MODIFY `mdx` VARCHAR(10000) NOT NULL;
