import { LoginService } from "../service/LoginService"
import { Handler } from "express";
import { HttpError } from "../errors/HttpError";
import { z } from "zod"



const LoginRequestSchema = z.object({
    cpf: z.string(),
    cnpj: z.string().nullable(),
    password: z.string()
})


export class LoginController{

    // POST login
    login: Handler = async (req, res) => {

        try {
            const parsedBody = LoginRequestSchema.parse(req.body)
            const userValidation = await LoginService.login(parsedBody)
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({ message: error.message })
            }
        }
    }
}