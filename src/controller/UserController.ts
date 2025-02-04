import { UserService } from "../service/UserService"
import { Handler } from "express";
import { HttpError } from "../errors/HttpError";
import { z } from "zod"



export class UserController {
    // GET usuario/
    showUsers: Handler = async (req, res) => {
        const showUsers = await UserService.showUsers()
        res.json(showUsers)
    }
}