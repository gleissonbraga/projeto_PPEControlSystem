import { CompanyController } from "../controller/CompanyController";
import { Router } from "express";

const company_router = Router()
const companyController = new CompanyController()



company_router.get("/", companyController.showCompanies)



export { company_router }