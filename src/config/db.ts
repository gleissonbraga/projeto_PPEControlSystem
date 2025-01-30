import { Pool } from 'pg'
import dotenv from 'dotenv';

dotenv.config()

const DB_USERNAME = process.env.DB_USERNAME || "postgres"
const DB_PASSWORD = process.env.DB_PASSWORD || "admin"
const DB_HOST = process.env.DB_HOST || "localhost"
const DB_PORT = process.env.DB_PORT || "5432"
const DB_NAME = process.env.DB_NAME || "ppe_control_system"


export const client = new Pool ({
    user: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: Number(DB_PORT),
    database: DB_NAME
})

export class Database{

    static async openDbConnection(){
        await client.connect()
    }

    static async endDbConnection(){
        await client.end()
    }

    static async db_query(query: string) {
        const res = await client.query(query)
        return res
    } 

    static async db_query_params(query: string, values: any[]) {
        const results = await client.query(query, values)
        return results
    }
}


// export async function openDbConnection(){
//     await client.connect()
// }

// export async function endDbConnection(){
//     await client.end()
// }

// export async function db_query(query: string) {
//     const res = await client.query(query)
//     return res
// } 
  
//   export async function db_query_params(query: string, values: any[]) {
//     const results = await client.query(query, values)
//     return results
// }