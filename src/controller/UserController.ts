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
    // GET usuario/
    showUsers: Handler = async (req, res) => {
        const showUsers = await UserService.showUsers()
        res.json(showUsers)
    }


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
}