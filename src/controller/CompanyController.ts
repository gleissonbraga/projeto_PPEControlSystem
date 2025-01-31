import { CompanyService } from "../service/CompanyService"
import { Handler } from "express";
import { HttpError } from "../errors/HttpError";
import { z } from "zod"


const CompanyRequestSchema = z.object({
    socialName: z.string(), 
    fantasyName: z.string(), 
    cnpj: z.string(), 
    enrollment_state: z.string(), 
    address: z.string(), 
    number: z.string(), 
    cep: z.string(), 
    cod_state: z.number(), 
    city: z.string()
})


export class CompanyController{
    // GET empresa/
    showCompanies: Handler = async (req, res) => {
        const companies = await CompanyService.showCompanies()
        res.json(companies)
    }

    // POST empresa/cadastrar
    createCompany: Handler = async (req, res) => {
        try {
            const parsedBody = CompanyRequestSchema.parse(req.body)
            const newCompany = await CompanyService.createCompany(parsedBody)
            res.json(newCompany)
        } catch (error) {
            if(error instanceof HttpError) {
                res.status(error.status).json({ message: error.message})
            }
        }
    }
}

