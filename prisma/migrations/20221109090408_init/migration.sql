-- CreateTable
CREATE TABLE `Layout` (
    `id` VARCHAR(191) NOT NULL,
    `mdx` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Layout_mdx_key`(`mdx`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
