import express from "express";
import {
  index,
  show,
  destroy,
  create,
  update,
} from "../../controllers/operatorsDocumentsController.js";
import { document_not_found } from "../../middleware/document_not_found.js";
import multer from "multer";
import {
  createDocumentValidate,
  updateDocumentValidate,
} from "../../validators/document.validate.js";

const operatorsDocumentsRouter = express.Router({ mergeParams: true });

const upload = multer();

operatorsDocumentsRouter.get("/", index);
operatorsDocumentsRouter.get("/:document", document_not_found, show);
operatorsDocumentsRouter.post(
  "/",
  createDocumentValidate,
  upload.single("document"),
  create
);
operatorsDocumentsRouter.put(
  "/:document",
  document_not_found,
  updateDocumentValidate,
  upload.single("document"),
  update
);
operatorsDocumentsRouter.delete("/:document", document_not_found, destroy);

export default operatorsDocumentsRouter;
