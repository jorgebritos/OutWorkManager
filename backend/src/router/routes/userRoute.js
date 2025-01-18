import express from "express"
import { fetch, create, update, deleteUser } from "../../controllers/userController.js"

const userRouter = express.Router();

userRouter.post("/", create)
userRouter.get("/", fetch);
userRouter.put("/update/:id", update)
userRouter.delete("/:id", deleteUser)

export default userRouter;