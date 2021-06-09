import { saveToList } from "../../lib/shopping_list";

export default function handler(req, res) {
  if (req.body) {
    saveToList(req.body);
    res.status(200).json({ msg: "Saved Correctly." });
    return;
  }
  res.status(401).json({ msg: "Couldn't Save. Invalid request body." });
}
