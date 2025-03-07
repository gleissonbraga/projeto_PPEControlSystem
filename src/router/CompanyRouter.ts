import { CompanyController } from "../controller/CompanyController";
import { Router } from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware"

const authMiddleware = new AuthMiddleware()

const company_router = Router()
const companyController = new CompanyController()



company_router.get("/", authMiddleware.checkAdmin(3), companyController.showCompanies)
company_router.post("/cadastrar", authMiddleware.checkAdmin(3), companyController.createCompany)
company_router.put("/atualizar/:id", authMiddleware.checkAdmin(3), companyController.updateCompany)



export { company_router }