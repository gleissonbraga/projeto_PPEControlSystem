import { HttpError } from "../errors/HttpError"
import { UserRepository } from "../repository/UserRepository"


export class UserService {
    static async showUsers(){
        const users = await UserRepository.showUsers()
        return users
    }
}