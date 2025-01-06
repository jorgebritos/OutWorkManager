import express from "express"
import { fetch } from "../../controllers/enterpriseController.js"

const enterpriseRouter = express.Router();

// userRouter.post("/create", create)
enterpriseRouter.get("/", fetch);
// userRouter.put("/update/:id", update)
// userRouter.delete("/delete/:id", deleteUser)

export default enterpriseRouter;