import { create, show, fetch, update, deleteOperator } from "../../controllers/operatorsController.js"
import express from "express"

const operatorRouter = express.Router();

operatorRouter.post("/:slug", create)
operatorRouter.get("/:slug", fetch);
operatorRouter.put("/:id", update)
operatorRouter.delete("/:id", deleteOperator)

export default operatorRouter;