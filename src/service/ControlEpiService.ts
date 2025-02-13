import { HttpError } from "../errors/HttpError"
import { ControlEpiRepository } from "../repository/ControlEpiRepository"



export class ControlEpiService{
    static async showControlEpi(){
        const result = await ControlEpiRepository.showControlEpi()
        return result
    }

    static async addControlEpi(attributes: {cod_employee: number, cod_epi: number}){
        const {cod_employee, cod_epi} = attributes

        if(!cod_employee || !cod_epi){
            throw new HttpError(400, "Todos os dados são obrigatórios")
        } else {
            const controlEpi = await ControlEpiRepository.addControlEpi({cod_employee, cod_epi})
            return controlEpi
        }
    }

    static async deleteControlEpi(id: number){

        if(!id){
            throw new HttpError(400, "Insira um valor")
        } else {
            const controlEpi = await ControlEpiRepository.deleteControlEpi(id)
            return controlEpi
        }
    }

    static async getControlByCompanyAndEmployee(cod_employee: number, cod_company: number){
        
        if(!cod_employee || !cod_company){
            throw new HttpError(400, "Todos os dados são obrigatórios")
        } else {
            const epis = await ControlEpiRepository.getControlByCompanyAndEmployee(cod_employee, cod_company)
            return epis
        }
    }
}