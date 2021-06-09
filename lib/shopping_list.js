import { promises as fs } from "fs";
import path from "path";

export const getList = async () => {
  const listPath = path.join(process.cwd(), "data", "list.json");
  const listData = JSON.parse(await fs.readFile(listPath));

  return listData;
};

export const saveToList = async (list) => {
  const listPath = path.join(process.cwd(), "data", "list.json");
  await fs.writeFile(listPath, JSON.stringify(list));
};
