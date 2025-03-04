import express from "express";
import {
  index,
  show,
  destroy,
  create,
  update,
} from "../../controllers/jobDocumentsController.js";
import { document_not_found } from "../../middleware/document_not_found.js";
import multer from "multer";
import {
  createDocumentValidate,
  updateDocumentValidate,
} from "../../validators/document.validate.js";

const jobDocumentsRouter = express.Router({ mergeParams: true });

const upload = multer();

jobDocumentsRouter.get("/", index);
jobDocumentsRouter.get("/:document", document_not_found, show);
jobDocumentsRouter.post(
  "/",
  createDocumentValidate,
  upload.single("document"),
  create
);
jobDocumentsRouter.put(
  "/:document",
  document_not_found,
  updateDocumentValidate,
  upload.single("document"),
  update
);
jobDocumentsRouter.delete("/:document", document_not_found, destroy);

export default jobDocumentsRouter;
