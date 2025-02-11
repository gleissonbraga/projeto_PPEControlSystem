import { CategoryEpiController } from "../controller/CategoryEpiController";
import { Router } from "express";

const category_epi_router = Router()
const categoryEpiController = new CategoryEpiController()



category_epi_router.get("/", categoryEpiController.showCategoryEpi)
category_epi_router.post("/cadastrar", categoryEpiController.createCategoryEpi)
category_epi_router.put("/atualizar/:id", categoryEpiController.updateCategoryEpi)



export { category_epi_router }