import { HttpError } from "../errors/HttpError"
import { EmployeeRepository } from "../repository/EmployeeRepository"


export class EmployeeService {

    static async showEmployeeAll(){
        const employees = await EmployeeRepository.showEmployeeAll()
        return employees
    }

    static async showEmployeeByCompany(cod_company: number){
        const employees = await EmployeeRepository.showEmployeeByCompany(cod_company)
        return employees
    }

    static async showInactivateEmployeeAll(){
        const employees = await EmployeeRepository.showInactivateEmployeeAll()
        return employees
    }

    static async showInativateEmployeeByCompany(cod_company: number){
        const employees = await EmployeeRepository.showInativateEmployeeByCompany(cod_company)
        return employees
    }

    static async createEmployee(attributes: {name: string, job_position: string, cpf: string, date_of_birth: string, start_date: string, cod_company: number | null}){
        const { name, job_position, cpf, date_of_birth, start_date, cod_company } = attributes

        if(!name || !job_position || !cpf || !date_of_birth || !start_date || !cod_company){
            throw new HttpError(400, "Todos os dados são obrigatórios")
        } else {

            // CHECK FORMAT DATE BIRTH
            const check_date_of_birth = /^\d{2}\/\d{2}\/\d{4}$/
            if(!check_date_of_birth.test(date_of_birth)) throw new HttpError(400, "A data inserida está incorreta, ex: (dd/mm/aaaa)")

            // CHECK FORMAT DATE BIRTH
            const check_start_date = /^\d{2}\/\d{2}\/\d{4}$/
            if(!check_start_date.test(date_of_birth)) throw new HttpError(400, "A data inserida está incorreta, ex: (dd/mm/aaaa)")

            // CHECK FORMAT DATE BIRTH
            const check_date_layoff = /^\d{2}\/\d{2}\/\d{4}$/
            if(!check_date_layoff.test(date_of_birth)) throw new HttpError(400, "A data inserida está incorreta, ex: (dd/mm/aaaa)")
            
            // CHECK FORMAT CPF
            const checkCpfIsNumber = /^\d{11}$/
            if(!checkCpfIsNumber.test(cpf)) throw new HttpError(400, "O CPF deve conter somente números. ex: (00000000000)")


            const employeeCreated = await EmployeeRepository.createEmployee({name, job_position, cpf, date_of_birth, start_date, cod_company})

            if(employeeCreated === null) throw new HttpError(400, "Este CPF já existe")

            return employeeCreated

        }
    }
}