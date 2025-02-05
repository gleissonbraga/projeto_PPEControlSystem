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
    status_admin: z.boolean(), 
    cod_company: z.number(), 
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
}