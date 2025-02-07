import { Database } from "../config/db"

const openDbConnection = Database.openDbConnection
const endDbConnection = Database.endDbConnection
const db_query = Database.db_query
const db_query_params = Database.db_query_params

// EMPLOYEE
// - cod_employee
// - employee_name
// - function
// - CPF
// - date_of_birth
// - date_start_date
// - date_layoff
// - status_employee
// - cod_company
// - date_now



interface EmployeeAttribute {
    name: string
    function: string
    cpf: string
    date_of_birth: string
    date_start_date: string
    date_layoff: string
    status_employee: boolean
    cod_company: number
}


export class EmployeeRepository{
    name: string
    function: string
    cpf: string
    date_of_birth: string
    date_start_date: string
    date_layoff: string
    status_employee: boolean
    cod_company: number


    constructor(attributes: EmployeeAttribute) {
        this.name = attributes.name
        this.function = attributes.function
        this.cpf = attributes.cpf
        this.date_of_birth = attributes.date_of_birth
        this.date_start_date = attributes.date_start_date
        this.date_layoff = attributes.date_layoff
        this.status_employee = attributes.status_employee
        this.cod_company = attributes.cod_company
    }


    static async showEmployeeAll(){
        const sql = "SELECT * FROM employee"
        const emplyees = await db_query(sql)

        return emplyees.rows
    }
    
    static async showEmployeeByCompany(cod_company: number){
        const sql = "SELECT e.cod_employee, e.name, e.function, e.cpf, e.date_of_birth, e.date_start_date, e.date_layoff, e.status_employee, c.fantasy_name, c.cnpj FROM employee as e JOIN company c ON (c.cod_company = e.cod_company) WHERE e.status_employee = $1 AND e.cod_ompany = $2 ORDER BY name"

        const trueEmployee = true
        const values = [trueEmployee, cod_company]

        const employeesCompanies = await db_query_params(sql, values)

        return employeesCompanies.rows
    }

    static async showInactivateEmployeeAll(){
        const sql = "SELECT * FROM employee WHERE status_employee = $1 ORDER BY NAME"

        const falseEmployee = false
        const value = [falseEmployee]

        const inactivateEmployee = await db_query_params(sql, value)

        return inactivateEmployee.rows
    }


    static async showInativateEmployeeByCompany(cod_company: number){
        const sql = "SELECT e.cod_employee, e.name, e.function, e.cpf, e.date_of_birth, e.date_start_date, e.date_layoff, e.status_employee, c.fantasy_name, c.cnpj FROM employee as e JOIN company c ON (c.cod_company = e.cod_company) WHERE e.status_employee = $1 AND e.cod_ompany = $2 ORDER BY NAME"

        const falseEmployee = false
        const values = [falseEmployee, cod_company]

        const inactivateEmployee = await db_query_params(sql, values)

        return inactivateEmployee.rows
    }

    
}