import { LoginService } from "../service/LoginService";
import { Handler } from "express";
import { z } from "zod"
import { HttpError } from "../errors/HttpError";


const payloadSchema = z.object({
    id: z.number(),
    name: z.string(),
    company: z.number(),
    status_admin: z.number()
})

// {id: number, name: string, company: number, status_admin: number}

export class AuthMiddleware {

    authUser: Handler = async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization
            
            if(!authHeader) throw new HttpError(401, "Token não fornecido")
            
            const payload = await LoginService.verifyToken(authHeader)

            console.log({payload})
            
            
            const teste = payloadSchema.parse(payload)
            req.payload = teste
            req.userId = req.payload.id;
            next()
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({message: error.message})
            }
        }
        
    }
}