import { HttpError } from "../errors/HttpError"
import { UserRepository } from "../repository/UserRepository"


export class UserService {
    static async showUsers(){
        const users = await UserRepository.showUsers()
        return users
    }

    static async createUser(attributes: {
        username: string,
        cpf: string,
        password: string,
        email: string,
        phonenumber: string,
        date_of_birth: string,
        status_admin: number,
        cod_company: number | null,
    }) {

        const { username, cpf, password, email, phonenumber, date_of_birth, status_admin, cod_company } = attributes


        if(!username || !cpf || !password || !email || !phonenumber || !date_of_birth || !status_admin) {
            throw new HttpError(400, "Erro ao cadastrar o usuário, todos os dados são obrigatórios")
        } else {
            
            // CHECK FORMAT DATE
            const checkBirth = /^\d{2}\/\d{2}\/\d{4}$/
            if(!checkBirth.test(date_of_birth)) throw new HttpError(400, "A data inserida está incorreta, ex: (dd/mm/aaaa)")
            
            // CHECK FORMAT CPF
            const checkCpfIsNumber = /^\d{11}$/
            if(!checkCpfIsNumber.test(cpf)) throw new HttpError(400, "O CPF deve conter somente números. ex: (00000000000)")
            
            // CHECK FORMAT PHONE NUMBER
            const checkPhoneNumberIsNumber = /^\d{11}$/
            if(!checkPhoneNumberIsNumber.test(phonenumber)) throw new HttpError(400, "O número de celular deve conter somente números. ex: (51123456789)")
            
            // CHECK INSERT AT DADOS IN COD AT THE COMPANY
            if(cod_company === null && status_admin === 1 || status_admin === 2) throw new HttpError(400, "O código da empresa deve ser preenchido")


            const newUser = await UserRepository.createUser({username, cpf, password, email, phonenumber, date_of_birth, status_admin, cod_company})

            if(newUser === null) throw new HttpError(400, "Este cpf já existe.")
            if(newUser === false) throw new HttpError(400, "Este email já existe.")

            return newUser
        }


    }

    static async updateUser(id: number, attributes: {
        username: string,
        cpf: string,
        password: string,
        email: string,
        phonenumber: string,
        date_of_birth: string,
        status_admin: number,
        cod_company: number | null,
    }) {

        const { username, cpf, password, email, phonenumber, date_of_birth, status_admin, cod_company } = attributes


        if(!username || !cpf || !password || !email || !phonenumber || !date_of_birth || !status_admin) {
            throw new HttpError(400, "Erro ao cadastrar o usuário, todos os dados são obrigatórios")
        } else {

            // CHECK FORMAT DATE
            const checkBirth = /^\d{2}\/\d{2}\/\d{4}$/
            if(!checkBirth.test(date_of_birth)) throw new HttpError(400, "A data inserida está incorreta, ex: (dd/mm/aaaa)")
            
            // CHECK FORMAT CPF
            const checkCpfIsNumber = /^\d{11}$/
            if(!checkCpfIsNumber.test(cpf)) throw new HttpError(400, "O CPF deve conter somente números. ex: (00000000000)")
            
            // CHECK FORMAT PHONE NUMBER
            const checkPhoneNumberIsNumber = /^\d{11}$/
            if(!checkPhoneNumberIsNumber.test(phonenumber)) throw new HttpError(400, "O número de celular deve conter somente números. ex: (51123456789)")
            
            // CHECK INSERT AT DADOS IN COD AT THE COMPANY
            if(cod_company === null && status_admin === 1) throw new HttpError(400, "O código da empresa deve ser preenchido")
            if(cod_company === null && status_admin === 2) throw new HttpError(400, "O código da empresa deve ser preenchido")
            if(cod_company != null && status_admin === 3) throw new HttpError(400, "O código da empresa deve ser null")

            const updateUser = await UserRepository.updateUser(id, {username, cpf, password, email, phonenumber, date_of_birth, status_admin, cod_company})

            if(updateUser === null) throw new HttpError(400, "Este cpf já existe.")
            if(updateUser === false) throw new HttpError(400, "Este email já existe.")

            return updateUser
        }
    }
}