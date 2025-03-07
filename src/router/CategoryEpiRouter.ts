import { CategoryEpiController } from "../controller/CategoryEpiController";
import { Router } from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware"

const authMiddleware = new AuthMiddleware()


const category_epi_router = Router()
const categoryEpiController = new CategoryEpiController()



category_epi_router.get("/", authMiddleware.checkAdmin(2), categoryEpiController.showCategoryEpi)
category_epi_router.post("/cadastrar", authMiddleware.checkAdmin(2), categoryEpiController.createCategoryEpi)
category_epi_router.put("/atualizar/:id", authMiddleware.checkAdmin(2), categoryEpiController.updateCategoryEpi)



export { category_epi_router }