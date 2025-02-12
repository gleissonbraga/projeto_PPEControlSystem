import { Product_epiService } from "../service/ProductEpiService"
import { Handler } from "express";
import { HttpError } from "../errors/HttpError";
import { z } from "zod"


const ProductEpiRequestSchema = z.object({
    cod_category_epi: z.number(),
    name_epi: z.string(),
    color: z.string(),
    size: z.string(),
})


export class Product_EpiController{

    // GET epis/
    showProductEpi: Handler = async (req, res) => {
        const productEpi = await Product_epiService.showProduct_Epi()
        res.json(productEpi)
    }


    // POST epis/cadastrar
    createProduct_epi: Handler = async (req, res) => {
        try {
            const parsedBody =  ProductEpiRequestSchema.parse(req.body)
            const createdProduct = await Product_epiService.createProduct_epi(parsedBody)
            res.json(createdProduct)
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({message: error.message})   
            }
        }
    }

    // PUT epis/atualizar/:id
    updateProduct_epi: Handler = async (req, res) => {
        const { id } = req.params

        try {
            const parsedBody =  ProductEpiRequestSchema.parse(req.body)
            const updateProduct = await Product_epiService.updateProduct_epi(+id, parsedBody)
            res.json(updateProduct)
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({message: error.message})   
            }
        }
    }
}