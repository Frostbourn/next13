// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

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
        id: process.env.DATABASE_URL,
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
