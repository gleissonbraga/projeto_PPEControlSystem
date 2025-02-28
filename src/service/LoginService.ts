import { UserRepository } from "../repository/UserRepository"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { HttpError } from "../errors/HttpError"
import dotenv from "dotenv"
import { CompanyRepository } from "../repository/CompanyRepository"
dotenv.config()




export class LoginService {
    static async login(attributes: {cpf: string, cnpj: string | null, password: string}) {
        const {cpf, cnpj, password} = attributes

        const user = await UserRepository.getCpf({cpf})
        const company = await CompanyRepository.getCodCompany({cnpj})


        if(cnpj != null) {
            const checkCnpjIsNumber = /^\d{14}$/
            if(!checkCnpjIsNumber.test(cnpj)) throw new HttpError(400, "CNPJ incorreto. ex: (00000000000000)")
        }


        const checkCpfIsNumber = /^\d{11}$/
        if(!checkCpfIsNumber.test(cpf)) throw new HttpError(400, "O CPF deve conter somente números. ex: (00000000000)")

        
        if(!cpf) throw new HttpError(404, "Este usuário não existe")

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword){

            throw new HttpError(404, "Senha incorreta")

        } else if(user.cod_company === null){



            if(!process.env.JWT_KEY) throw new HttpError(404, "JWT_KEY não definida nas variáveis de ambiente")

            const payload = {id: user.cod_user, name: user.username, company: user.cod_company, status_admin: user.status_admin}
            console.log(payload)
            const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '4h'})
            return {id: 200, token}

        } else if(user.cod_company !== null && cnpj === null) {

            throw new HttpError(404, "CNPJ incorreto")

        } else if (company.cod_company === user.cod_company){


            if(!process.env.JWT_KEY) throw new HttpError(404, "JWT_KEY não definida nas variáveis de ambiente")

            const payload = {id: user.cod_user, name: user.username, company: user.cod_company, status_admin: user.status_admin}

            const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '4h'})
            return {id: 200, token}
        }


    }

    static async verifyToken(token: string){
        try {
            if(!process.env.JWT_KEY) throw new HttpError(404, "JWT_KEY não definida nas variáveis de ambiente")
                
                const payload = jwt.verify(token, process.env.JWT_KEY) as {id: number, name: string, company: number | null, status_admin: number}

                
                return payload
        } catch (error) {
            if(error){
                throw new HttpError(401, "Token Inválido!" )
            }
        }
    }
}