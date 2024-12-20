import express from "express"
import { create, deleteEnterprise, fetch, update } from "../controllers/enterpriseController";

const enterpriseRouter = express.Router();

enterpriseRouter.post("/create", create)
enterpriseRouter.get("/getAllEnterprises", fetch)
enterpriseRouter.put("/update/:id", update)
enterpriseRouter.delete("/delete/:id", deleteEnterprise)

export default enterpriseRouter;