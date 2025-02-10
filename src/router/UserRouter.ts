import { UserController } from "../controller/UserController";
import { Router } from "express";

const user_router = Router()
const userController = new UserController()



user_router.get("/", userController.showUsers)
user_router.get("/inativo", userController.showInactiveUsers)
user_router.get("/inativo/:id", userController.showInactiveUsersByCompany)
user_router.get("/admin/empresas", userController.showUsersAdminsCompanies)
user_router.get("/superadmins", userController.showUsersSuperAdmins)
user_router.post("/cadastrar", userController.createUser)
user_router.put("/atualizar/:id", userController.updateUser)
user_router.patch("/delete/:id", userController.deleteUser)
user_router.put("/ativa/:id", userController.activeUser)



export { user_router }