// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { serialize } from "next-mdx-remote/serialize";

const prisma = new PrismaClient();

type Data = {
  mdxSource: string | unknown;
  plainText: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const result = await prisma.layout.findMany();
    const plainText = result[0]?.mdx;
    const mdxSource = await serialize(plainText, {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
        format: "mdx",
      },
      parseFrontmatter: true,
    });

    res.status(200).json({ mdxSource, plainText });
    await prisma.$disconnect();
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}
