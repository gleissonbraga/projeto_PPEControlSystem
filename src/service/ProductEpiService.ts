import { HttpError } from "../errors/HttpError"
import { Product_EpiRepository } from "../repository/ProductEpiRepository"





export class Product_epiService{
    static async showProduct_Epi(){
        const products = await Product_EpiRepository.showProduct_Epi()
        return products
    }

    static async showProductsByCompany(cod_company: number | null){
        const products = await Product_EpiRepository.showProductsByCompany(cod_company)
        return products
    }

    static async createProduct_epi(attributes: {cod_category_epi: number, name_epi: string, color: string, size: string}, cod_company: number | null){
        const { cod_category_epi, color, name_epi, size } = attributes

        if(cod_company === null) throw new HttpError(403, "Você não pode criar produtos, pois não possui vinculo com alguma empresa")

        if(!cod_category_epi || !color || !name_epi || !size){
            throw new HttpError(400, "Todos os dados são obrigatórios")
        } else {

            const createProduct = await Product_EpiRepository.createProduct_epi({cod_category_epi, name_epi, color, size}, cod_company)
            return createProduct
        }


    }


    static async updateProduct_epi(id: number, cod_company: number | null, attributes: {cod_category_epi: number, name_epi: string, color: string, size: string}){
        const { cod_category_epi, color, name_epi, size } = attributes

        if(cod_company === null) throw new HttpError(403, "Você não pode criar produtos, pois não possui vinculo com nenhuma empresa")

        if(!cod_category_epi || !color || !name_epi || !size){
            throw new HttpError(400, "Todos os dados são obrigatórios")
        } else {
            const createProduct = await Product_EpiRepository.updateProduct_epi(id, cod_company, {cod_category_epi, name_epi, color, size})
            return createProduct
        }
    }
}