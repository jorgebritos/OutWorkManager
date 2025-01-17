import express from "express"
import { create, deleteEnterprise, editOperator, fetch, update } from "../../controllers/enterpriseController.js"

const enterpriseRouter = express.Router();

enterpriseRouter.post("/create", create)
enterpriseRouter.get("/", fetch);
enterpriseRouter.get("/:slug", fetch);
enterpriseRouter.get("/:slug/operators/:ci", fetch);
enterpriseRouter.put("/:slug", update);
enterpriseRouter.put("/:slug/operators", update)
enterpriseRouter.put("/:slug/operators/:ci", update)
enterpriseRouter.put("/:slug/operators/:ci", update)
enterpriseRouter.put("/:slug/edit/:ci", editOperator)
enterpriseRouter.delete("/:id", deleteEnterprise)

export default enterpriseRouter;