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
        status_admin: boolean,
        cod_company: number,
    }) {

        const { username, cpf, password, email, phonenumber, date_of_birth, status_admin, cod_company } = attributes


        if(!username || !cpf || !password || !email || !phonenumber || !date_of_birth || !status_admin || !cod_company) {
            throw new HttpError(400, "Erro ao cadastrar o usuário, todos os dados são obrigatórios")
        } else {
            

            const checkBirth = /^\d{2}\/\d{2}\/\d{4}$/
            if(!checkBirth.test(date_of_birth)) throw new HttpError(400, "A data inserida está incorreta, ex: (dd/mm/aaaa)")

            const checkCpfIsNumber = /^\d{11}$/
            if(!checkCpfIsNumber.test(cpf)) throw new HttpError(400, "O CPF deve conter somente números. ex: (00000000000)")
            
            const checkPhoneNumberIsNumber = /^\d{11}$/
            if(!checkPhoneNumberIsNumber.test(phonenumber)) throw new HttpError(400, "O número de celular deve conter somente números. ex: (51123456789)")


            const newUser = await UserRepository.createUser({username, cpf, password, email, phonenumber, date_of_birth, status_admin, cod_company})

            console.log('TESTE SERVICE', newUser)

            if(newUser === null) throw new HttpError(400, "Este cpf já existe.")
            if(newUser === false) throw new HttpError(400, "Este email já existe.")

            return newUser
        }


    }
}