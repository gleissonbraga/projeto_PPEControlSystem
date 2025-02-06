import { UserController } from "../controller/UserController";
import { Router } from "express";

const user_router = Router()
const userController = new UserController()



user_router.get("/", userController.showUsers)
user_router.post("/cadastrar", userController.createUser)
user_router.put("/atualizar/:id", userController.updateUser)



export { user_router }