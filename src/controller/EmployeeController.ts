import { EmployeeService } from "../service/EmployeeService"
import { Handler } from "express";
import { HttpError } from "../errors/HttpError";
import { z } from "zod"


const EmployeeRequestSchema = z.object({
    name: z.string(),
    job_position: z.string(),
    cpf: z.string(),
    date_of_birth: z.string(),
    start_date: z.string(),
    cod_company: z.number()
})

const EmployeeUpdateRequestSchema = z.object({
    name: z.string(),
    job_position: z.string(),
    cpf: z.string(),
    date_of_birth: z.string(),
    start_date: z.string(),
    date_layoff: z.string().nullable(),
    status_employee: z.boolean(),
    cod_company: z.number()
})


export class EmployeeController{

      // GET funcionarios/todos
    showEmployeeAll: Handler = async (req, res) => {
        const allEmployees = await EmployeeService.showEmployeeAll()
        res.json(allEmployees)
    }

    // GET funcionarios/empresa/:id
    showEmployeeByCompany: Handler = async (req, res) => {
        const {id} = req.params

        try {
            const employee = await EmployeeService.showEmployeeByCompany(+id)
            res.json(employee)
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({message: error.message})
            }
        }
    }

    // GET funcionarios/todos/inativos
    showInactivateEmployeeAll: Handler = async (req, res) => {
        const allEmployees = await EmployeeService.showInactivateEmployeeAll()
        res.json(allEmployees)
    }

    // GET funcionarios/empresa/inativos/:id
    showInactivateEmployeeByCompany: Handler = async (req, res) => {
        const {id} = req.params

        try {
            const employee = await EmployeeService.showInativateEmployeeByCompany(+id)
            res.json(employee)
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({message: error.message})
            }
        }
    }

    // POST funcionarios/cadastrar
    createEmployee: Handler = async (req, res) => {
        try {
            const parsedBody = EmployeeRequestSchema.parse(req.body)
            const employeeCreated = await EmployeeService.createEmployee(parsedBody)
            res.json(employeeCreated)
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({message: error.message})
            }
        }
    }

    // PUT funcionarios/atualizar/:id
    updatemployee: Handler = async (req, res) => {
        const {id} = req.params
        try {
            const parsedBody = EmployeeUpdateRequestSchema.parse(req.body)
            const employeeCreated = await EmployeeService.updateEmployee(+id, parsedBody)
            res.json(employeeCreated)
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({message: error.message})
            }
        }
    }

    // PATCH funcionario/inativar/:id
    inactivateEmployee: Handler = async (req, res) => {
        const {id} = req.params
        const inactivatedEmployee = await EmployeeService.inactivateEmployee(+id)
        res.json(inactivatedEmployee)
    }

    // PATCH funcionario/ativar/:id
    activateEmployee: Handler = async (req, res) => {
        const {id} = req.params
        const activatedEmployee = await EmployeeService.activateEmployee(+id)
        res.json(activatedEmployee)
    }

}