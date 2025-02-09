import { EmployeeController } from "../controller/EmployeeController";
import { Router } from "express";

const employee_router = Router()
const employeeController = new EmployeeController()



employee_router.get("/todos", employeeController.showEmployeeAll)
employee_router.get("/empresa/:id", employeeController.showEmployeeByCompany)
employee_router.get("/todos/inativos", employeeController.showInactivateEmployeeAll)
employee_router.get("/empresa/inativos/:id", employeeController.showInactivateEmployeeByCompany)
employee_router.post("/cadastrar", employeeController.createEmployee)
// employee_router.put("/atualizar/:id", employeeController.)



export { employee_router }