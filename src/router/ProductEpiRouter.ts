import { Product_EpiController } from "../controller/ProductEpiController";
import { Router } from "express";

const product_epi_router = Router()
const productEpiController = new Product_EpiController()



product_epi_router.get("/", productEpiController.showProductEpi)
product_epi_router.post("/cadastrar", productEpiController.createProduct_epi)
product_epi_router.put("/atualizar/:id", productEpiController.updateProduct_epi)




export { product_epi_router }