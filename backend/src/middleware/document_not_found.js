import Document from "../Database/Esquemas/Document.js";
import mongoose from "mongoose";

export const document_not_found = async (req, res, next) => {
  const params = req.params;

  if (!mongoose.Types.ObjectId.isValid(params.document)) {
    return res.status(404).json({ error: "Document not found" });
  }

  try {
    const document = await Document.findById(params.document);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
