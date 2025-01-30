import { CompanyService } from "../service/CompanyService"
import { Handler } from "express";
import { HttpError } from "../errors/HttpError";
import { z } from "zod"



export class CompanyController{
    // GET empresa/
    showCompanies: Handler = async (req, res) => {
        const companies = await CompanyService.showCompanies()
        res.json(companies)
    }

    // POST empresa/cadastrar
    createCompany: Handler = async (req, res) => {

    }
}

