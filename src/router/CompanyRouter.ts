import { CompanyController } from "../controller/CompanyController";
import { Router } from "express";

const company_router = Router()
const companyController = new CompanyController()



company_router.get("/", companyController.showCompanies)
company_router.post("/cadastrar", companyController.createCompany)
company_router.put("/atualizar/:id", companyController.updateCompany)



export { company_router }