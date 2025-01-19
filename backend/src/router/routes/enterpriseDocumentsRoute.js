import express from "express";
import {
  index,
  show,
  destroy,
  create,
  update,
} from "../../controllers/enterprisesDocumentsController.js";
import { document_not_found } from "../../middleware/document_not_found.js";
import multer from "multer";
import {
  createDocumentValidate,
  updateDocumentValidate,
} from "../../validators/document.validate.js";

const enterprisesDocumentsRouter = express.Router({ mergeParams: true });

const upload = multer();

enterprisesDocumentsRouter.get("/", index);
enterprisesDocumentsRouter.get("/:document", document_not_found, show);
enterprisesDocumentsRouter.post(
  "/",
  createDocumentValidate,
  upload.single("document"),
  create
);
enterprisesDocumentsRouter.put(
  "/:document",
  document_not_found,
  updateDocumentValidate,
  upload.single("document"),
  update
);
enterprisesDocumentsRouter.delete("/:document", document_not_found, destroy);

export default enterprisesDocumentsRouter;
