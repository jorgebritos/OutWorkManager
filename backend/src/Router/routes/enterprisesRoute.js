import express from "express"
import { create, deleteEnterprise, fetch, update } from "../../controllers/enterpriseController.js"

const enterpriseRouter = express.Router();

enterpriseRouter.post("/create", create)
enterpriseRouter.get("/", fetch);
enterpriseRouter.get("/:slug", fetch);
enterpriseRouter.put("/:slug/operators", update)
enterpriseRouter.delete("/:id", deleteEnterprise)

export default enterpriseRouter;