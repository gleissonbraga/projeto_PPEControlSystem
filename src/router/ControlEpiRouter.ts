import { ControlEpiControl } from "../controller/ControlEpiController";
import { Router } from "express";

const control_epi_router = Router()
const controlEpiController = new ControlEpiControl()



control_epi_router.get("/", controlEpiController.showControlEpi)
control_epi_router.post("/inserir", controlEpiController.addControlEpi)
control_epi_router.delete("/deletar/:id_epi/funcionario/:id_employee", controlEpiController.deleteControlEpi)
control_epi_router.get("/funcionario/:id_employee/empresa/:id_company", controlEpiController.getControlByCompanyAndEmployee)



export { control_epi_router }