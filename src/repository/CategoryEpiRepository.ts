import { Database } from "../config/db"

const openDbConnection = Database.openDbConnection
const endDbConnection = Database.endDbConnection
const db_query = Database.db_query
const db_query_params = Database.db_query_params


// CATEGORY_EPI
// - cod_category_epi
// - model
// - date_now

interface CategoryEpiAtributes {
    model: string
}


export class CategoryEpiRepository{
    model: string

    constructor(attributes: CategoryEpiAtributes){
        this.model = attributes.model
    }

    static async showCategory(){
        const sql = "SELECT * FROM category_epi"
        const result = await db_query(sql)

        return result.rows
    }


    static async createCategoryEpi(attributes: CategoryEpiAtributes){
        const { model } = attributes

        const modelLowerCase = model.toLocaleLowerCase()

        const sql = "INSERT INTO category_epi (model) VALUES ($1) RETURNING *"
        const value = [modelLowerCase]

        const result = await db_query_params(sql, value)

        return result.rows[0]
    }

    static async updateCategoryEpi(id: number, attributes: CategoryEpiAtributes) {
        const { model } = attributes

        const modelLowerCase = model.toLocaleLowerCase()

        const sql = "UPDATE category_epi SET model = $1 WHERE cod_category_epi = $2 RETURNING *"
        const value = [modelLowerCase, id]

        const result = await db_query_params(sql, value)

        return result.rows[0]
    }
}