import { UserController } from "../controller/UserController";
import { Router } from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

const authMiddleware = new AuthMiddleware()

const user_router = Router()
const userController = new UserController()



user_router.get("/", authMiddleware.checkAdmin(3), userController.showUsers)
user_router.get("/inativo", authMiddleware.checkAdmin(3), userController.showInactiveUsers)
user_router.get("/inativo/:id", authMiddleware.checkAdmin(2), userController.showInactiveUsersByCompany)
user_router.get("/admin/empresas", authMiddleware.checkAdmin(2),userController.showUsersAdminsCompanies)
user_router.get("/superadmins", authMiddleware.checkAdmin(3), userController.showUsersSuperAdmins)
user_router.post("/cadastrar", authMiddleware.checkAdmin(3), userController.createUser)
user_router.put("/atualizar/:id", authMiddleware.checkAdmin(2), userController.updateUser)
user_router.patch("/delete/:id", authMiddleware.checkAdmin(2), userController.deleteUser)
user_router.put("/ativa/:id", authMiddleware.checkAdmin(2), userController.activeUser)



export { user_router }