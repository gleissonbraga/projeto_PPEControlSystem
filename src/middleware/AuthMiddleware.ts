import { LoginService } from "../service/LoginService";
import { Handler } from "express";
import { z } from "zod"
import { HttpError } from "../errors/HttpError";


const payloadSchema = z.object({
    id: z.number(),
    name: z.string(),
    company: z.number().nullable(),
    status_admin: z.number()
})

// {id: number, name: string, company: number, status_admin: number}

export class AuthMiddleware {

    authUser: Handler = async (req, res, next) => {
        try {
            
            const authHeader = req.headers.authorization
            
            if(!authHeader) throw new HttpError(401, "Token não fornecido")
            const payload = await LoginService.verifyToken(authHeader)
            
            
            const user = payloadSchema.parse(payload)
            req.payload = user
            req.userId = req.payload.id
            req.userCompany = req.payload.company
            req.userStatusAdmin = req.payload.status_admin

            next()
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({message: error.message})
            }
        }
        
    }
    checkAdmin = (minLevel: number): Handler => async (req, res, next) => {
        try {

            if(!req.userStatusAdmin) {

                res.status(403).json({ message: "Usuário não autenticado ou sem nível de acesso" });
                return;

            }

            if(req.userStatusAdmin < minLevel) {
                res.status(403).json({ message: "Acesso negado" });
                return;
            }

            next()
        } catch (error) {
            if (error instanceof HttpError){
                res.status(error.status).json({ message: error.message })
            } else {
                res.status(500).json({ message: "Erro ao verificar permissão" })
            }
            
        }
    }

}
