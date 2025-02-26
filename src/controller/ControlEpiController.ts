 import { ControlEpiService } from "../service/ControlEpiService";
 import { HttpError } from "../errors/HttpError";
 import { Handler } from "express";
 import { z } from "zod"




const ControlRequestSchema = z.object({
    cod_employee: z.number(),
    cod_epi: z.number()
})


export class ControlEpiControl{

    // POST controle/epi/
    showControlEpi: Handler = async (req, res) => {
        const showControls = await ControlEpiService.showControlEpi()
        res.json(showControls)
    }

    // POST controle/epi/inserir
    addControlEpi: Handler = async (req, res) =>{
        try {
            const parsedbody = ControlRequestSchema.parse(req.body)
            const createdControl = await ControlEpiService.addControlEpi(parsedbody)
            res.json(createdControl)
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({message: error.message})
            }
        }
    }

    // DELETE controle/epi/deletar/:id_epi/funcionario/:id_funcionario
    deleteControlEpi: Handler = async (req, res) =>{
        const { id_epi, id_employee } = req.params

        try {
            const deletedControl = await ControlEpiService.deleteControlEpi(+id_epi, +id_employee)
            res.json(deletedControl)
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({message: error.message})
            }
        }
    }

    // GET controle/epi/funcionario/:id_employe/empresa/:id_company

    getControlByCompanyAndEmployee: Handler = async (req, res) => {
        const { id_employee, id_company } = req.params

        try {
            const control = await ControlEpiService.getControlByCompanyAndEmployee(+id_employee, +id_company)
            res.json(control)
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({message: error.message})
            } 
        }
    }
}