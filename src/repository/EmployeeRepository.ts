import { Database } from "../config/db"

const openDbConnection = Database.openDbConnection
const endDbConnection = Database.endDbConnection
const db_query = Database.db_query
const db_query_params = Database.db_query_params

// EMPLOYEE
// - cod_employee
// - employee_name
// - job_position
// - CPF
// - date_of_birth
// - date_start_date
// - date_layoff
// - status_employee
// - cod_company
// - date_now


/////////////////////////////////////////////
// EXTRA: search by cpf, name and job position



interface EmployeeAttribute {
    name: string
    job_position: string
    cpf: string
    date_of_birth: string
    start_date: string
    date_layoff: string
    status_employee: boolean
    cod_company: number
}


export class EmployeeRepository{
    name: string
    job_position: string
    cpf: string
    date_of_birth: string
    start_date: string
    date_layoff: string
    status_employee: boolean
    cod_company: number


    constructor(attributes: EmployeeAttribute) {
        this.name = attributes.name
        this.job_position = attributes.job_position
        this.cpf = attributes.cpf
        this.date_of_birth = attributes.date_of_birth
        this.start_date = attributes.start_date
        this.date_layoff = attributes.date_layoff
        this.status_employee = attributes.status_employee
        this.cod_company = attributes.cod_company
    }


    static async showEmployeeAll(){
        const sql = "SELECT * FROM employee"
        const employees = await db_query(sql)

        return employees.rows
    }
    
    static async showEmployeeByCompany(cod_company: number){
        const sql = "SELECT e.cod_employee, e.name, e.job_position, e.cpf, e.date_of_birth, e.start_date, e.date_layoff, e.status_employee, c.fantasy_name, c.cnpj FROM employee as e JOIN company c ON (c.cod_company = e.cod_company) WHERE e.status_employee = $1 AND e.cod_ompany = $2 ORDER BY name"

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
        const sql = "SELECT e.cod_employee, e.name, e.job_position, e.cpf, e.date_of_birth, e.start_date, e.date_layoff, e.status_employee, c.fantasy_name, c.cnpj FROM employee as e JOIN company c ON (c.cod_company = e.cod_company) WHERE e.status_employee = $1 AND e.cod_ompany = $2 ORDER BY name"

        const falseEmployee = false
        const values = [falseEmployee, cod_company]

        const inactivateEmployee = await db_query_params(sql, values)

        return inactivateEmployee.rows
    }

    // SEARCH BY NAME

    static async searchByNameAll(){
        // "SELECT * FROM employee WHERE name ILIKE '%nome_de_pesquisa%'"
    }

    static async searchByNameInactiveAll(){

    }

    static async searchByNameCompany(){

    }
    
    static async searchByNameInactivateCompany(){

    }

    // SEARCH BY CPF
    static async searchByCpfAll(){

    }

    static async searchByCpfInactiveAll(){

    }

    static async searchByCpfCompany(){

    }

    static async searchByCpfInactivateCompany(){

    }

    // SEARCH BY JOB POSITION
    
    static async searchByJobPositionAll(){

    }

    static async searchByJobPositionInactiveAll(){

    }

    static async searchByJobPositionCompany(){

    }

    static async searchByJobPositionInactivateCompany(){

    }


    static async createEmployee(attributes: EmployeeAttribute){
        const { name, job_position, cpf, date_of_birth, start_date, date_layoff, cod_company } = attributes
        
        const nameLowerCase = name.toLocaleLowerCase()
        const job_positionLowerCase = job_position.toLocaleLowerCase()
        const default_status_employee = true

        const sqlCheckCpf = "SELECT cpf FROM employee WHERE cpf = $1"
        const valueCheckCpf = [cpf]
        const resultCheckCpf = await db_query_params(sqlCheckCpf, valueCheckCpf)

        if(resultCheckCpf.rows.length > 0){
            return null
        } else {
            const sqlCreate = "INSERT INTO employee (name, job_position, cpf, date_of_birth, start_date, date_layoff, status_employee, cod_company) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *"
            const valuesCreate = [nameLowerCase, job_positionLowerCase, cpf, date_of_birth, start_date, date_layoff, default_status_employee, cod_company]

            const resultEmployee = await db_query_params(sqlCreate, valuesCreate)

            return resultEmployee.rows[0]
        }

    }
 
}