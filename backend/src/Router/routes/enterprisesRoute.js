import express from "express"
import { create, fetch } from "../../controllers/enterpriseController.js"

const enterpriseRouter = express.Router();

enterpriseRouter.post("/create", create)
enterpriseRouter.get("/", fetch);
// userRouter.put("/update/:id", update)
// userRouter.delete("/delete/:id", deleteUser)

export default enterpriseRouter;