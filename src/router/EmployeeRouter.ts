import { EmployeeController } from "../controller/EmployeeController";
import { Router } from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

const authMiddleware = new AuthMiddleware()
const employee_router = Router()
const employeeController = new EmployeeController()



employee_router.get("/todos", authMiddleware.checkAdmin(3), employeeController.showEmployeeAll)
employee_router.get("/empresa/ativo", authMiddleware.checkAdmin(1), employeeController.showEmployeeByCompany)
employee_router.get("/todos/inativos", authMiddleware.checkAdmin(3),employeeController.showInactivateEmployeeAll)
employee_router.get("/empresa/inativos", authMiddleware.checkAdmin(1),employeeController.showInactivateEmployeeByCompany)
employee_router.post("/cadastrar", authMiddleware.checkAdmin(1), employeeController.createEmployee)
employee_router.put("/atualizar/:id", authMiddleware.checkAdmin(2), employeeController.updatemployee)
employee_router.patch("/inativar/:id", authMiddleware.checkAdmin(2), employeeController.inactivateEmployee)
employee_router.patch("/ativar/:id", authMiddleware.checkAdmin(3), employeeController.activateEmployee)



export { employee_router }