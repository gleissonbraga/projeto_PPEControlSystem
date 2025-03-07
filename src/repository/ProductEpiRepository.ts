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
        const sql = "SELECT pi.cod_epi, pi.name_epi, pi.color, pi.size, c.fantasy_name, c.cnpj FROM product_epi as pi JOIN company c ON (c.cod_company = pi.cod_company) ORDER BY name_epi"

        const result = await db_query(sql)

        return result.rows.map((epi) => {
            return {
            cod_epi: epi.cod_epi,
            name_epi: epi.name_epi,
            color: epi.color,
            size: epi.size.toUpperCase(),
            fantasy_name: epi.fantasy_name,
            cnpj: epi.cnpj,
        }
        })
    }

    static async showProductsByCompany(cod_company: number | null){
        const sql = "SELECT pi.cod_epi, pi.name_epi, pi.color, pi.size, c.fantasy_name, c.cnpj FROM product_epi as pi JOIN company c ON (c.cod_company = pi.cod_company) WHERE pi.cod_company = $1 ORDER BY name_epi"

        const result = await db_query_params(sql, [cod_company])
        const epis = result.rows


        return epis.map((epi) => {
            return {
            cod_epi: epi.cod_epi,
            name_epi: epi.name_epi,
            color: epi.color,
            size: epi.size.toUpperCase(),
            fantasy_name: epi.fantasy_name,
            cnpj: epi.cnpj,
        }
        })
    }

    static async createProduct_epi(attributes: Product_EpiAttribute, cod_company: number | null){
        const { cod_category_epi, color, name_epi, size } = attributes

        const colorLowerCase = color.toLocaleLowerCase()
        const name_epiLowerCase = name_epi.toLocaleLowerCase()
        const sizeLowercase = size.toLocaleLowerCase()


        const sql = "INSERT INTO product_epi (cod_category_epi, cod_company, name_epi, color, size) VALUES ($1, $2, $3, $4, $5) RETURNING *"
        const values = [cod_category_epi, cod_company, colorLowerCase, name_epiLowerCase, sizeLowercase ]


        const result = await db_query_params(sql, values)


        const productCreated = result.rows[0]

        return {
            cod_epi: productCreated.cod_epi,
            name_epi: productCreated.name_epi,
            color: productCreated.color,
            size: productCreated.size.toUpperCase(),
        }
    }


    static async updateProduct_epi(id: number, cod_company: number | null, attributes: Product_EpiAttribute){
        const { cod_category_epi, color, name_epi, size } = attributes

        const colorLowerCase = color.toLocaleLowerCase()
        const name_epiLowerCase = name_epi.toLocaleLowerCase()
        const sizeLowercase = size.toLocaleLowerCase()

        const sqlUpdate = "UPDATE product_epi SET cod_category_epi = $1, name_epi = $2, color = $3, size = $4 WHERE cod_epi = $5 RETURNING *"
        const valuesUpdate = [ cod_category_epi, name_epiLowerCase, colorLowerCase, sizeLowercase, id ]

        const resultUpdate = await db_query_params(sqlUpdate, valuesUpdate)
        

        const productUpdated = resultUpdate.rows[0]

        return {
            cod_epi: productUpdated.cod_epi,
            name_epi: productUpdated.name_epi,
            color: productUpdated.color,
            size: productUpdated.size.toUpperCase(),
        }
    }
}