import { HttpError } from "../errors/HttpError"
import { CompanyRepository } from "../repository/CompanyRepository"



export class CompanyService {
    static async showCompanies() {
        const result = await CompanyRepository.showCompanies()
        return result
    }

    static async createCompany(attributes: {
        socialName: string, 
        fantasyName: string, 
        cnpj: string, 
        enrollment_state: string, 
        address: string, 
        number: string, 
        cep: string, 
        cod_state: number, 
        city: string}) {

            const {socialName, fantasyName, cnpj, enrollment_state, address, number, cep, cod_state, city} = attributes

            if(!socialName || !fantasyName || !cnpj || !enrollment_state || !address || !number || !cep || !cod_state || !city) {
                throw new HttpError(400, "Erro ao cadastrar a empresa, Todos os dados são obrigatórios")
            } else {
                const newCompany = await CompanyRepository.createCompany({socialName, fantasyName, cnpj, enrollment_state, address, number, cep, cod_state, city})
                return newCompany
            }

    }
}