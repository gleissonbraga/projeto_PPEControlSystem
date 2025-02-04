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
}