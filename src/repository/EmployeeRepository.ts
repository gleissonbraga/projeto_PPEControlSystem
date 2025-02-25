import { Database } from "../config/db"
import { PdfEmployee } from "../pdf/pdfEmployee"

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

const newDocPdfEmploye = new PdfEmployee()

interface EmployeeAttribute {
    name: string
    job_position: string
    cpf: string
    date_of_birth: string
    start_date: string
    date_layoff: string | null
    status_employee: boolean
    cod_company: number
}


export class EmployeeRepository{
    name: string
    job_position: string
    cpf: string
    date_of_birth: string
    start_date: string
    date_layoff: string | null
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
        const sql = "SELECT * FROM employee_test"
        const employees = await db_query(sql)

        return employees.rows
    }
    
    static async showEmployeeByCompany(cod_company: number){
        const sql = "SELECT e.cod_employee, e.name, e.job_position, e.cpf, e.date_of_birth, e.start_date, e.date_layoff, e.status_employee, c.fantasy_name, c.cnpj FROM employee as e JOIN company c ON (c.cod_company = e.cod_company) WHERE e.status_employee = $1 AND e.cod_company = $2 ORDER BY name"

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
        const sql = "SELECT e.cod_employee, e.name, e.job_position, e.cpf, e.date_of_birth, e.start_date, e.date_layoff, e.status_employee, c.fantasy_name, c.cnpj FROM employee as e JOIN company c ON (c.cod_company = e.cod_company) WHERE e.status_employee = $1 AND e.cod_company = $2 ORDER BY name"

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


    static async createEmployee(attributes: Omit<EmployeeAttribute, "status_employee"| "date_layoff">){
        const { name, job_position, cpf, date_of_birth, start_date, cod_company } = attributes
        
        const nameLowerCase = name.toLocaleLowerCase()
        const job_positionLowerCase = job_position.toLocaleLowerCase()
        const default_status_employee = true
        const date_layoff_parametro = null

        const sqlCheckCpf = "SELECT cpf FROM employee WHERE cpf = $1"
        const valueCheckCpf = [cpf]
        const resultCheckCpf = await db_query_params(sqlCheckCpf, valueCheckCpf)

        if(resultCheckCpf.rows.length > 0){
            return null
        } else {

            const sqlCompany = "SELECT social_name, cnpj FROM company WHERE cod_company = $1"
            const resultCompany = await db_query_params(sqlCompany, [cod_company])
            const company = resultCompany.rows[0]
            const social_name = company.social_name
            const cnpj = company.cnpj

            const date_layoff = ""

            const namePdf = await PdfEmployee.createPdfEmployee({nameLowerCase, job_positionLowerCase, start_date, date_layoff, social_name, cnpj, cpf})


            const sqlCreate = "INSERT INTO employee_test (name, job_position, cpf, date_of_birth, start_date, date_layoff, status_employee, cod_company, content_pdf) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *"
            const valuesCreate = [nameLowerCase, job_positionLowerCase, cpf, date_of_birth, start_date, date_layoff_parametro, default_status_employee, cod_company, namePdf]


            const resultEmployee = await db_query_params(sqlCreate, valuesCreate)

            return resultEmployee.rows[0]
        }

    }


    static async updateEmployee(id: number, attributes: EmployeeAttribute){
        const { name, job_position, cpf, date_of_birth, start_date, date_layoff, status_employee, cod_company } = attributes

        const nameLowerCase = name.toLocaleLowerCase()
        const job_positionLowerCase = job_position.toLocaleLowerCase()

        const sqlCheckCpf = "SELECT cpf FROM employee_test WHERE cpf = $1 and cod_employee != $2"
        const valueCheckCpf = [cpf, id]
        const resultCheckCpf = await db_query_params(sqlCheckCpf, valueCheckCpf)


        if(resultCheckCpf.rows.length > 0) {
            return null
        } else {

            const sqlUpdateCpf = "UPDATE employee_test SET cpf = $1 WHERE cod_employee = $2 RETURNING *"
            const valueCpf = [cpf, id]
            const cpfUpdated = await db_query_params(sqlUpdateCpf, valueCpf)

            const sqlCompany = "SELECT social_name, cnpj FROM company WHERE cod_company = $1"
            const resultCompany = await db_query_params(sqlCompany, [cod_company])
            const company = resultCompany.rows[0]
            const social_name = company.social_name
            const cnpj = company.cnpj


            const sqlNamePdfEmployee = "SELECT * FROM employee_test WHERE cod_employee = $1"
            const getUser = await db_query_params(sqlNamePdfEmployee, [id])

            const user = getUser.rows[0]
            const employeeName = user.name
            const employeeJobPosition = user.job_position
            const employeeStartDate = user.start_date
            const employeeDateLayoff = user.date_layoff
            const employeeCpf = user.cpf
            const employeeCodCompany = user.cod_company

            const sql = `SELECT 
            pe.name_epi, 
            pe.color, 
            pe.size,
            p.date_delivery, 
            c.cnpj 
            FROM control_epi as p 
            JOIN employee_test e ON (e.cod_employee = p.cod_employee) 
            JOIN company c ON (c.cod_company = e.cod_company) 
            JOIN product_epi pe ON (pe.cod_epi = pe.cod_epi) 
            WHERE e.cod_employee = $1 AND c.cod_company = $2`
            const value = [id, employeeCodCompany]
            const getListUserEpi = await db_query_params(sql, value)
            const dataEpis = getListUserEpi.rows

            
            const updateFilePdf = await PdfEmployee.updatePdfEmployee({content_pdf: user.content_pdf}, {employeeName, employeeJobPosition, employeeStartDate, employeeDateLayoff, social_name,cnpj, employeeCpf}, dataEpis)
            
            const namePdfReal = updateFilePdf != user.content_pdf ? updateFilePdf : user.content_pdf


            const sqlUpdateEmployee = "UPDATE employee_test SET name = $1, job_position = $2, date_of_birth = $3, start_date = $4, date_layoff = $5, status_employee = $6, cod_company = $7, content_pdf = $8 WHERE cod_employee = $9 RETURNING *"
            const valuesUpdateEmployee = [nameLowerCase, job_positionLowerCase, date_of_birth, start_date, date_layoff, status_employee, cod_company, namePdfReal, id]
            const employeeUpdated = await db_query_params(sqlUpdateEmployee, valuesUpdateEmployee)

            const resultEmployee = employeeUpdated.rows[0]

            return resultEmployee
            
        }

    }

    static async inactivateEmployee(id: number) {
        const status_employee = false

        const sqlInactivate = "UPDATE employee SET status_employee = $1 WHERE cod_employee = $2 RETURNING *"
        const valueInactivate = [status_employee, id]
        const result = await db_query_params(sqlInactivate, valueInactivate)

        return result.rows[0]
    }


    static async activateEmployee(id: number) {
        const status_employee = true

        const sqlActivate = "UPDATE employee SET status_employee = $1 WHERE cod_employee = $2 RETURNING *"
        const valueActivate = [status_employee, id]
        const result = await db_query_params(sqlActivate, valueActivate)
        
        return result.rows[0]

    }
}