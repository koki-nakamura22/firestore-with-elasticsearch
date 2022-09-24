import { NextApiRequest, NextApiResponse } from "next";
import { Index, Document } from "../lib/elasticsearch/v6/elasticsearch";

type ResMessageType = {
  message: string;
};

const createIndex = async (
  req: NextApiRequest,
  res: NextApiResponse<ResMessageType>
) => {
  const existsIndex: boolean = await Index.exists("book");
  if (existsIndex) {
    return res.status(400).json({
      message: "aaa",
    });
  }
  return res.status(400).json({
    message: "bbb",
  });
};

export default createIndex;
