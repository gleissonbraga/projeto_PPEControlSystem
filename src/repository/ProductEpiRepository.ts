import { Database } from "../config/db"

const db_query = Database.db_query
const db_query_params = Database.db_query_params




// PRODUCT_EPI
// - cod_epi
// - cod_category_epi
// - name_epi
// - color
// - size
// - date_now


interface Product_EpiAttribute{
    cod_category_epi: number
    name_epi: string
    color: string
    size: string
}


export class Product_EpiRepository{
    cod_category_epi: number
    name_epi: string
    color: string
    size: string

    constructor(attributes: Product_EpiAttribute){
        this.cod_category_epi = attributes.cod_category_epi
        this.name_epi = attributes.name_epi
        this.color = attributes.color
        this.size = attributes.size
    }

    static async showProduct_Epi(){
        const sql = "SELECT * FROM product_epi ORDER BY name_epi"

        const result = await db_query(sql)

        return result.rows
    }

    static async createProduct_epi(attributes: Product_EpiAttribute){
        const { cod_category_epi, color, name_epi, size } = attributes

        const colorLowerCase = color.toLocaleLowerCase()
        const name_epiLowerCase = name_epi.toLocaleLowerCase()
        const sizeLowercase = size.toLocaleLowerCase()


        const sql = "INSERT INTO product_epi (cod_category_epi, name_epi, color, size) VALUES ($1, $2, $3, $4) RETURNING *"
        const values = [cod_category_epi, colorLowerCase, name_epiLowerCase, sizeLowercase ]


        const result = await db_query_params(sql, values)


        const productCreated = result.rows[0]

        return productCreated
    }


    static async updateProduct_epi(id: number, attributes: Product_EpiAttribute){
        const { cod_category_epi, color, name_epi, size } = attributes

        const colorLowerCase = color.toLocaleLowerCase()
        const name_epiLowerCase = name_epi.toLocaleLowerCase()
        const sizeLowercase = size.toLocaleLowerCase()

        const sqlUpdate = "UPDATE product_epi SET cod_category_epi = $1, name_epi = $2, color = $3, size = $4 WHERE cod_epi = $5 RETURNING *"
        const valuesUpdate = [ cod_category_epi, name_epiLowerCase, colorLowerCase, sizeLowercase, id ]

        const resultUpdate = await db_query_params(sqlUpdate, valuesUpdate)
        

        const productUpdated = resultUpdate.rows[0]

        return productUpdated
    }
}