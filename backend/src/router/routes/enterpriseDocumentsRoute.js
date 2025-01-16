import express from "express";
import { index, show } from "../../controllers/enterprisesDocumentsController.js";
import {document_not_found} from "../../middleware/document_not_found.js";

const enterprisesDocumentsRouter = express.Router({ mergeParams: true });

enterprisesDocumentsRouter.get("/", index);
enterprisesDocumentsRouter.get("/:document", document_not_found, show);
enterprisesDocumentsRouter.post("/", show);

export default enterprisesDocumentsRouter;
