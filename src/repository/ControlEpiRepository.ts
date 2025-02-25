import { Database } from "../config/db"
import { PdfEmployee } from "../pdf/pdfEmployee"

const openDbConnection = Database.openDbConnection
const endDbConnection = Database.endDbConnection
const db_query = Database.db_query
const db_query_params = Database.db_query_params


// CONTROL_EPI
// - cod_control
// - cod_employee
// - cod_epi
// - quantity
// - date_delivery (date_now)

interface ControlEpiAttributes {
    cod_employee: number
    cod_epi: number
    date_delivery: Date
}



export class ControlEpiRepository{
    cod_employee: number
    cod_epi: number
    date_delivery: Date

    constructor(attributes: ControlEpiAttributes){
        this.cod_employee = attributes.cod_employee
        this.cod_epi = attributes.cod_epi
        this.date_delivery = attributes.date_delivery
    }

    static async showControlEpi(){
        const sql = "SELECT * FROM control_epi"
        const result = await db_query(sql)

        return result.rows
    }

    static async addControlEpi(attributes: Omit<ControlEpiAttributes, "date_delivery">){
        const {cod_employee, cod_epi} = attributes

        const date = new Date()

        const sqlControl = "INSERT INTO control_epi (cod_employee, cod_epi, date_delivery) VALUES ($1, $2, $3) RETURNING *"
        const valuesControl = [cod_employee, cod_epi, date]

        const result = await db_query_params(sqlControl, valuesControl)

        const sqlNamePdfEmployee = "SELECT * FROM employee_test as e JOIN company c ON (c.cod_company = e.cod_company)  WHERE cod_employee = $1"
        const getEmployee = await db_query_params(sqlNamePdfEmployee, [cod_employee])
        const employee = getEmployee.rows[0]

        const nameEmployee = employee.name
        const job_positionLowerCase = employee.job_position
        const start_date = employee.start_date
        const date_layoff = employee.date_layoff
        const cpf = employee.cpf
        const social_name = employee.social_name
        const cnpj = employee.cnpj


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
        const value = [cod_employee, employee.cod_company]
        const getListUserEpi = await db_query_params(sql, value)
        const dataEpis = getListUserEpi.rows

        // console.log("teste 01 = lista epis", dataEpis)
        

        const pdf = await PdfEmployee.updatePdfControlEpi({content_pdf: employee.content_pdf},{nameEmployee, job_positionLowerCase, start_date, date_layoff, social_name, cnpj, cpf}, dataEpis)

        console.log("teste volta do pdf", pdf)

        return result.rows[0]
    }

    static async deleteControlEpi(id: number){
        const sql = "DELETE FROM control_epi WHERE cod_control = $1 RETURNING *"
        const value = [id]
        const result = await db_query_params(sql, value)

        return result.rows[0]
    }

    static async getControlByCompanyAndEmployee(cod_employee: number, cod_company: number){
        const sql = `SELECT 
                pe.name_epi, 
                pe.color, 
                pe.size, 
                c.cnpj 
            FROM control_epi as p 
            JOIN employee_test e ON (e.cod_employee = p.cod_employee) 
            JOIN company c ON (c.cod_company = e.cod_company) 
            JOIN product_epi pe ON (pe.cod_epi = pe.cod_epi) 
            WHERE e.cod_employee = $1 AND c.cod_company = $2`
        const value = [cod_employee, cod_company]

        const result = await db_query_params(sql, value)
        
        console.log(result.rows)
        return result.rows

    }
}