import { HttpError } from "../errors/HttpError"
import { Product_EpiRepository } from "../repository/ProductEpiRepository"





export class Product_epiService{
    static async showProduct_Epi(){
        const products = await Product_EpiRepository.showProduct_Epi()
        return products
    }

    static async createProduct_epi(attributes: {cod_category_epi: number, name_epi: string, color: string, size: string}){
        const { cod_category_epi, color, name_epi, size } = attributes

        if(!cod_category_epi || !color || !name_epi || !size){
            throw new HttpError(400, "Todos os dados são obrigatórios")
        } else {

            const createProduct = await Product_EpiRepository.createProduct_epi({cod_category_epi, name_epi, color, size})
            return createProduct
        }


    }


    static async updateProduct_epi(id: number, attributes: {cod_category_epi: number, name_epi: string, color: string, size: string}){
        const { cod_category_epi, color, name_epi, size } = attributes

        if(!cod_category_epi || !color || !name_epi || !size){
            throw new HttpError(400, "Todos os dados são obrigatórios")
        } else {
            const createProduct = await Product_EpiRepository.updateProduct_epi(id, {cod_category_epi, name_epi, color, size})
            return createProduct
        }
    }
}