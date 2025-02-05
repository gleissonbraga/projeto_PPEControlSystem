import bcrypt from 'bcrypt'
import { Database } from "../config/db"

const openDbConnection = Database.openDbConnection
const endDbConnection = Database.endDbConnection
const db_query = Database.db_query
const db_query_params = Database.db_query_params



interface UserAttributes {
    username: string
    cpf: string
    password: string
    email: string
    phonenumber: string
    date_of_birth: string
    status_admin: boolean
    cod_company: number

}



export class UserRepository {
    username: string
    cpf: string
    password: string
    email: string
    phonenumber: string
    date_of_birth: string
    status_admin: boolean
    cod_company: number

    constructor(attributes: UserAttributes){
        this.username = attributes.username
        this.cpf = attributes.cpf
        this.password = attributes.password
        this.email = attributes.email
        this.phonenumber = attributes.phonenumber
        this.date_of_birth = attributes.date_of_birth
        this.status_admin = attributes.status_admin
        this.cod_company = attributes.cod_company
    }



    static async showUsers(){
        const sql = "SELECT u.username, u.cpf, u.password, u.email, u.phonenumber, u.date_of_birth, c.fantasy_name, c.cnpj FROM users as u join company c on (c.cod_company = u.cod_company)"

        const resultUsers = await db_query(sql)
        const users = resultUsers.rows

        return users
    }


    static async createUser(attributes: UserAttributes) {
        const { username, cpf, password, email, phonenumber, date_of_birth, status_admin, cod_company } = attributes

        const usernameLowerCase = username.toLocaleLowerCase()
        const emailLowerCase = email.toLocaleLowerCase()
        const cryptPassword = await bcrypt.hash(password, 10)


        const sqlVerificationCpf = "SELECT cpf FROM users WHERE cpf = $1"
        const valueCheckCpf = [cpf]
        const resultCheckCpf = await db_query_params(sqlVerificationCpf, valueCheckCpf)

        console.log("TESTE REPOSITORY CPF")

        const sqlVerificationEmail = "SELECT email FROM users WHERE email = $1"
        const valueCheckEmail = [email]
        const resultCheckEmail = await db_query_params(sqlVerificationEmail, valueCheckEmail)

        console.log("TESTE REPOSITORY EMAIL")

        if(resultCheckEmail.rows.length > 0) return false
        
        if(resultCheckCpf.rows.length > 0){
            return null
        } else {

            const sqlCreateUser = "INSERT INTO users (username, cpf, password, email, phonenumber, date_of_birth, status_admin, cod_company) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *"
            const valuesUser = [usernameLowerCase, cpf, cryptPassword, emailLowerCase, phonenumber, date_of_birth, status_admin, cod_company]
            const resultCreateUser = await db_query_params(sqlCreateUser, valuesUser)
            
            console.log("TESTE REPOSITORY CREATE")

            const userCreated = resultCreateUser.rows[0].cod_user

            const selectSqlUser = "SELECT u.username, u.cpf, u.password, u.email, u.phonenumber, u.date_of_birth, c.fantasy_name, c.cnpj FROM users as u join company c on (c.cod_company = u.cod_company) WHERE cod_user = $1"
            
            const userSelect = await db_query_params(selectSqlUser, [userCreated])

            console.log("TESTE REPOSITORY USER CREATED", userSelect)

            
            return userSelect.rows[0]
        }
    }
}