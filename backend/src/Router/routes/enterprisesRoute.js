import express from "express"
import { create, deleteEnterprise, fetch } from "../../controllers/enterpriseController.js"

const enterpriseRouter = express.Router();

enterpriseRouter.post("/create", create)
enterpriseRouter.get("/", fetch);
enterpriseRouter.get("/:slug", fetch);
// userRouter.put("/update/:id", update)
enterpriseRouter.delete("/:id", deleteEnterprise)

export default enterpriseRouter;