import { Database } from "../config/db"

const openDbConnection = Database.openDbConnection
const endDbConnection = Database.endDbConnection
const db_query = Database.db_query
const db_query_params = Database.db_query_params



// COMPANY
// - cod_company
// - social_name
// - fantasy_name
// - cnpj
// - enrollment_state
// - addres
// - number
// - CEP
// - cod_state
// - city
// - date_now


interface CompanyAttributes {
    socialName: string
    fantasyName: string
    cnpj: string
    enrollment_state: string
    address: string
    number: string
    cep: string
    cod_state: number
    city: string
}



export class CompanyRepository {
    socialName: string
    fantasyName: string
    cnpj: string
    enrollment_state: string
    address: string
    number: string
    cep: string
    cod_state: number
    city: string

    constructor(attributes: CompanyAttributes){
        this.socialName = attributes.socialName
        this.fantasyName = attributes.fantasyName
        this.cnpj = attributes.cnpj
        this.enrollment_state = attributes.enrollment_state
        this.address = attributes.address
        this.number = attributes.number
        this.cep = attributes.cep
        this.cod_state = attributes.cod_state
        this.city = attributes.city
    }

    static async showCompanies(){


        const sql = 'SELECT c.social_name, c.fantasy_name, c.cnpj, c.enrollment_state, c.address, c.number, c.cep, s.state_name, s.state_code, c.city FROM company as c join states s on (s.cod_state = c.cod_state)'
        const companies = await db_query(sql)


        return companies.rows
    }


    static async createCompany(attributes: CompanyAttributes) {
        const {socialName, fantasyName, cnpj, enrollment_state, address, number, cep, cod_state, city} = attributes

        const socialNameLowerCase = socialName.toLowerCase()
        const fantasyNameLowerCase = fantasyName.toLowerCase()
        const cnpjLowerCase = cnpj.toLowerCase()
        const enrollment_stateLowerCase = enrollment_state.toLowerCase()
        const addressLowerCase = address.toLowerCase()
        const numberLowerCase = number.toLowerCase()
        const cepLowerCase = cep.toLowerCase()
        const cityLowerCase = city.toLowerCase()


        const sqlVerficationCnpj = 'SELECT cnpj FROM company where cnpj = $1'
        const valueCnpj = [cnpjLowerCase]

        const resultCnpj = await db_query_params(sqlVerficationCnpj, valueCnpj)
        
        if(resultCnpj.rows.length > 0){
            return null
        } else {
            const sql = 'INSERT INTO company (social_name, fantasy_name, cnpj, enrollment_state, address, number, cep, cod_state, city) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING cod_company'
            const values = [socialNameLowerCase, fantasyNameLowerCase, cnpjLowerCase, enrollment_stateLowerCase, addressLowerCase, numberLowerCase, cepLowerCase, cod_state, cityLowerCase]
    
    
            const insertResult = await db_query_params(sql, values)
    
    
            const companyCreated = insertResult.rows[0].cod_company
    
    
            const sqlCompany = 'SELECT c.social_name, c.fantasy_name, c.cnpj, c.enrollment_state, c.address, c.number, c.cep, s.state_name, s.state_code, c.city FROM company as c join states s on s.cod_state = c.cod_state WHERE c.cod_company = $1'
    
    
            const selectResult = await db_query_params(sqlCompany, [companyCreated])
    
    
            return selectResult.rows[0]
        }
    }


        
}