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
                throw new HttpError(400, "Erro ao cadastrar a empresa, todos os dados são obrigatórios")
            } else {

                // CHECK IF THE CNPJ IS A NUMBER AND HAS 14 INNER NUMBERS
                const verificaionCnpj = /^\d{14}$/
                if(!verificaionCnpj.test(cnpj)) throw new HttpError(400, "CNPJ inválido")
                
                // CHECK IF THE CEP IS A NUMBER AND HAS 8 INNER NUMBERS
                const verificaionCep = /^\d{8}$/
                if(!verificaionCep.test(cep)) throw new HttpError(400, "CEP inválido")
                
                // CHECK IF THE ENROLLMENT STATE IS A NUMBER AND HAS 9 INNER NUMBERS
                const verificaionenrollment_state = /^\d{9}$/
                if(!verificaionenrollment_state.test(enrollment_state)) throw new HttpError(400, "Inscrição estadual inválida")
                
                const newCompany = await CompanyRepository.createCompany({socialName, fantasyName, cnpj, enrollment_state, address, number, cep, cod_state, city})

                // CHECK IF THE CNPJ EXIST IN THE DATABASE
                if(newCompany === null) throw new HttpError(400, "Este cnpj já existe.")
                    
                return newCompany
            }
            
    }


    static async updateCompany(id: number, attributes: {
        socialName: string, 
        fantasyName: string, 
        enrollment_state: string, 
        address: string, 
        number: string, 
        cep: string, 
        cod_state: number, 
        city: string}) {
        

            const {socialName, fantasyName, enrollment_state, address, number, cep, cod_state, city} = attributes

            if(!socialName || !fantasyName || !enrollment_state || !address || !number || !cep || !cod_state || !city){
                throw new HttpError(400, "Todos os dados devem ser inseridos")
            } else {
                
                
                // CHECK IF THE CNPJ IS A NUMBER AND HAS 14 INNER NUMBERS
                // const verificaionCnpj = /^\d{14}$/
                // if(!verificaionCnpj.test(cnpj)) throw new HttpError(400, "CNPJ inválido")
                
                // CHECK IF THE CEP IS A NUMBER AND HAS 8 INNER NUMBERS
                const verificaionCep = /^\d{8}$/
                if(!verificaionCep.test(cep)) throw new HttpError(400, "CEP inválido")
                
                // CHECK IF THE ENROLLMENT STATE IS A NUMBER AND HAS 9 INNER NUMBERS
                const verificaionenrollment_state = /^\d{9}$/
                if(!verificaionenrollment_state.test(enrollment_state)) throw new HttpError(400, "Inscrição estadual inválida")

                const updateCompany = await CompanyRepository.updateCompany(id, {socialName, fantasyName, enrollment_state, address, number, cep, cod_state, city})

                if(updateCompany === null) throw new HttpError(400, "Este CNPJ já existe")

                return updateCompany

            }

    }
}