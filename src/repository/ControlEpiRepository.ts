import { Database } from "../config/db"

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
            JOIN employee e ON (e.cod_employee = p.cod_employee) 
            JOIN company c ON (c.cod_company = e.cod_company) 
            JOIN product_epi pe ON (pe.cod_epi = pe.cod_epi) 
            WHERE e.cod_employee = $1 AND c.cod_company = $2`
        const value = [cod_employee, cod_company]

        const result = await db_query_params(sql, value)

        return result.rows
    }
}