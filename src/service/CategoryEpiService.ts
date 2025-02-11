import { HttpError } from "../errors/HttpError"
import { CategoryEpiRepository } from "../repository/CategoryEpiRepository"






export class CategoryEpiService{
    static async showCategoryEpi(){
        const category = await CategoryEpiRepository.showCategory()
        return category
    }

    static async createCategoryEpi(attributes: { model: string }){
        const {model} = attributes

        if(!model){
            throw new HttpError(400, "Error ao cadastrar a categoria, os dados devem ser preenchidos")
        } else {

            const result = await CategoryEpiRepository.createCategoryEpi({model})

            return result
        }
    }


    static async updateCategoryEpi(id: number, attributes: { model: string }){
        const {model} = attributes

        if(!model){
            throw new HttpError(400, "Error ao atualizar a categoria, os dados devem ser preenchidos")
        } else {

            const result = await CategoryEpiRepository.updateCategoryEpi(id, {model})

            return result
        }
    }
}