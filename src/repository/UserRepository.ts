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
    status_admin: number
    cod_company: number | null

}



export class UserRepository {
    username: string
    cpf: string
    password: string
    email: string
    phonenumber: string
    date_of_birth: string
    status_admin: number
    cod_company: number | null

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
        const sql = "SELECT u.cod_user, u.username, u.cpf, u.password, u.email, u.phonenumber, u.date_of_birth, c.fantasy_name, c.cnpj, u.status_admin FROM users as u LEFT JOIN company c on (c.cod_company = u.cod_company) ORDER BY cod_user"

        const resultUsers = await db_query(sql)
        const users = resultUsers.rows

        return users
    }

    static async showUsersAdminsCompanies(){
        const sql = "SELECT u.cod_user, u.username, u.cpf, u.password, u.email, u.phonenumber, u.date_of_birth, c.fantasy_name, c.cnpj, u.status_admin FROM users as u JOIN company c on (c.cod_company = u.cod_company) ORDER BY cod_user"

        const resultUsers = await db_query(sql)
        const users = resultUsers.rows

        return users
    }

    static async showUsersSuperAdmins(){
        const sql = "SELECT * FROM user WHERE status_admin = $1 AND cod_company = $2"

        const valueOne = 3
        const valueTwo = null
        const values = [valueOne, valueTwo]

        const resultUsers = await db_query_params(sql, values)

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


        const sqlVerificationEmail = "SELECT email FROM users WHERE email = $1"
        const valueCheckEmail = [email]
        const resultCheckEmail = await db_query_params(sqlVerificationEmail, valueCheckEmail)


        if(resultCheckEmail.rows.length > 0) return false
        
        if(resultCheckCpf.rows.length > 0){
            return null
        } else {


            const sqlCreateUser = "INSERT INTO users (username, cpf, password, email, phonenumber, date_of_birth, status_admin, cod_company) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *"
            const valuesUser = [usernameLowerCase, cpf, cryptPassword, emailLowerCase, phonenumber, date_of_birth, status_admin, cod_company]
            const resultCreateUser = await db_query_params(sqlCreateUser, valuesUser)
            


            const userCreated = resultCreateUser.rows[0].cod_user

            if(cod_company == null) {
                return resultCreateUser.rows[0]
            } else {
                const selectSqlUser = "SELECT u.username, u.cpf, u.password, u.email, u.phonenumber, u.date_of_birth, c.fantasy_name, c.cnpj FROM users as u join company c on (c.cod_company = u.cod_company) WHERE cod_user = $1"
            
                const userSelect = await db_query_params(selectSqlUser, [userCreated])
    
                return userSelect.rows[0]
            }

        }
    }

    static async updateUser(id: number, attributes: UserAttributes) {
        const { username, cpf, password, email, phonenumber, date_of_birth, status_admin, cod_company } = attributes


        const usernameLowerCase = username.toLocaleLowerCase()
        const emailLowerCase = email.toLocaleLowerCase()
        const cryptPassword = await bcrypt.hash(password, 10)

        // CHECK IF EXIST CPF
        const sqlVerificationCpf = "SELECT cpf FROM users WHERE cpf = $1 and cod_user != $2"
        const valueCheckCpf = [cpf, id]
        const resultCheckCpf = await db_query_params(sqlVerificationCpf, valueCheckCpf)

        // CHECK IF EXIST EMAIL
        const sqlVerificationEmail = "SELECT email FROM users WHERE email = $1 AND cod_user != $2"
        const valueCheckEmail = [email, id]
        const resultCheckEmail = await db_query_params(sqlVerificationEmail, valueCheckEmail)


        if(resultCheckEmail.rows.length > 0) return false
        
        if(resultCheckCpf.rows.length > 0){
            return null
        } else {

            const sqlCpf = "UPDATE users SET cpf = $1 WHERE cod_user = $2 RETURNING cpf"
            const valueUpdateCpf = [cpf, id]

            const resultUpdateCpf = await db_query_params(sqlCpf, valueUpdateCpf)
            const CpfUpdated = resultUpdateCpf.rows[0]


            const sqlCreateUser = "UPDATE users SET username = $1, password = $2, email = $3, phonenumber = $4, date_of_birth = $5, status_admin = $6, cod_company = $7 WHERE cod_user = $8 RETURNING *"

            const valuesUser = [usernameLowerCase, cryptPassword, emailLowerCase, phonenumber, date_of_birth, status_admin, cod_company, id]
            const resultUpdateUser = await db_query_params(sqlCreateUser, valuesUser)
            
            return resultUpdateUser.rows[0]

        }
    }
}