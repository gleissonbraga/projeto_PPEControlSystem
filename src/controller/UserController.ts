import { UserService } from "../service/UserService"
import { Handler } from "express";
import { HttpError } from "../errors/HttpError";
import { z } from "zod"


const UerRequestSchema = z.object({
    username: z.string(), 
    cpf: z.string(), 
    password: z.string(), 
    email: z.string(), 
    phonenumber: z.string(), 
    date_of_birth: z.string(), 
    status_admin: z.number(), 
    cod_company: z.number().nullable(), 
})


export class UserController {

    // GET usuario/inativo/
    showInactiveUsers: Handler = async (req, res) => {
        const inativateUsers = await UserService.showInactiveUsers()
        res.json(inativateUsers)
    }

    // GET usuario/inativo/:id
    showInactiveUsersByCompany: Handler = async (req, res) => {
        const {id} = req.params
        try {
            const inativateUsers = await UserService.showInactiveUsersByCompany(+id)
            res.json(inativateUsers)
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({ message: error.message })
            }
        }
    }

    // GET usuario/
    showUsers: Handler = async (req, res) => {
        const showUsers = await UserService.showUsers()
        res.json(showUsers)
    }

    // GET usuario/admin/empresas
    showUsersAdminsCompanies: Handler = async (req, res) => {
        const company = 1

        try {
            const showUsersAdminsCompanies = await UserService.showUsersAdminsCompanies(company)
            res.json(showUsersAdminsCompanies)
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({ message: error.message })
            }
        }

    }

    // GET usuario/superadmins
    showUsersSuperAdmins: Handler = async (req, res) => {

        const showUsersSuperAdmins = await UserService.showUsersSuperAdmins()
        res.json(showUsersSuperAdmins)
    }

    // POST usuario/cadastrar
    createUser: Handler = async (req, res) => {
        try {
            const parsedBody = UerRequestSchema.parse(req.body)
            const userCreated = await UserService.createUser(parsedBody)
            res.json(userCreated)
            
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({ message: error.message })
            }
        }
    }

    // GET usuario/atualizar/:id
    updateUser: Handler = async (req, res) => {
        const { id } = req.params
        try {
            const parsedBody = UerRequestSchema.parse(req.body)
            const userUpdate = await UserService.updateUser(+id, parsedBody)
            res.json(userUpdate)
            
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({ message: error.message })
            }
        }
    }

    // PUT usuario/ativa/:id
    activeUser: Handler = async (req, res) => {
        const {id} = req.params
        
        try {
            const userActivate = await UserService.activeUser(+id)
            res.json(userActivate)
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({ message: error.message })
            }
        }
    }

    // PUT usuario/delete/:id
    deleteUser: Handler = async (req, res) => {
        const {id} = req.params
        
        try {
            const userActivate = await UserService.deleteUser(+id)
            res.json(userActivate)
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({ message: error.message })
            }
        }
    }
}