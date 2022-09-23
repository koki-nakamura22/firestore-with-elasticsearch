// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { assertIsDefined } from "../helpers/assert";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const ELASTICSEARCH_URL: string | undefined = process.env.ELASTICSEARCH_URL;

  assertIsDefined(ELASTICSEARCH_URL);

  // res.status(200).json({ name: 'John Doe' })
  res.status(200).json({ name: ELASTICSEARCH_URL });
}
