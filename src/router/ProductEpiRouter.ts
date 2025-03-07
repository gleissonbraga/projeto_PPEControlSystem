import { Product_EpiController } from "../controller/ProductEpiController"
import { Router } from "express"
import { AuthMiddleware } from "../middleware/AuthMiddleware"

const authMiddleware = new AuthMiddleware()

const product_epi_router = Router()
const productEpiController = new Product_EpiController()



product_epi_router.get("/", authMiddleware.checkAdmin(3) ,productEpiController.showProductEpi)
product_epi_router.get("/empresa", authMiddleware.checkAdmin(1) ,productEpiController.showProductsByCompany)
product_epi_router.post("/cadastrar", authMiddleware.checkAdmin(1), productEpiController.createProduct_epi)
product_epi_router.put("/atualizar/:id", authMiddleware.checkAdmin(1), productEpiController.updateProduct_epi)




export { product_epi_router }