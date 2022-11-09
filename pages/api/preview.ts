// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { serialize } from "next-mdx-remote/serialize";

const prisma = new PrismaClient();

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const body = JSON.parse(req.body);

    await prisma.layout.update({
      where: {
        id: "7186f446-1de6-4b93-b451-f3ea9d29e53b",
      },
      data: {
        mdx: body.mdx,
      },
    });

    res.status(200).json({ message: "Database updated" });
    await prisma.$disconnect();
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}
