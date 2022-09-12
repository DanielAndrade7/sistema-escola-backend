import { Turma } from "../model/ModelTurma";
import { BaseDataBase } from "./BaseDataBase";

export class TurmaData extends BaseDataBase{

    async criar(turma: Turma) {
       
        await this.getConnection().insert({
            id: turma.getId(),
            nome: turma.getName()
        }).into("Turma")
        
        return `Turma ${turma.getName()} criada com sucesso!`
    }

    async selecionarTurmasAtivas(): Promise<Turma[]>{
        const result = await this.getConnection().select("*").from("Turma").where("modulo",">",0)

        const todasTurmas = result.map((turma) => {
            return new Turma(turma.nome, turma.id, turma.modulo)
        })
        return todasTurmas
    }

    async mudarModulo(id: string, modulo:number): Promise<string> {
        await this.getConnection().update({modulo}).into("Turma").where({id})

        return `O modulo foi alterado!`
    }

    async buscarTurmaPeloId(id:string) {
        const result = await this.getConnection().select("*").from("Turma").where({id})

        return result
    }
}