import { CategoryEpiService } from "../service/CategoryEpiService"
import { Handler } from "express";
import { HttpError } from "../errors/HttpError";
import { z } from "zod"



const CategoryEpiRequestSchema = z.object({
    model: z.string()
})



export class CategoryEpiController{

    // GET categoria_epi/
    showCategoryEpi: Handler = async (req, res) => {
        const category = await CategoryEpiService.showCategoryEpi()
        res.json(category)
    }

    // POST categoria_epi/cadastrar
    createCategoryEpi: Handler = async (req, res) => {
        try {
            const parsedBody = CategoryEpiRequestSchema.parse(req.body)
            const category = await CategoryEpiService.createCategoryEpi(parsedBody)
            res.json(category)
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({ message: error.message })
            }
        }
    }

    // PUT category_epi/atualizar/:id
    updateCategoryEpi: Handler = async (req, res) => {
        const {id} = req.params

        try {
            const parsedBody = CategoryEpiRequestSchema.parse(req.body)
            const category = await CategoryEpiService.updateCategoryEpi(+id, parsedBody)
            res.json(category)
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({ message: error.message })
            }
        }
    }
}