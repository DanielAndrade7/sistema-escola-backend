import { Estudante } from "../model/ModelEstudante";
import { BaseDataBase } from "./BaseDataBase";

export class EstudanteData extends BaseDataBase {
  async criarEstudante(estudante: Estudante) {
    await this.getConnection()
      .insert({
        id: estudante.getId(),
        nome: estudante.getNome(),
        email: estudante.getEmail(),
        data_nascimento: estudante.getNascimento(),
        turma_id: estudante.getTurmaId(),
      })
      .into("Estudante");

    return `Estudante ${estudante.getNome()} criado com sucesso!`;
  }

  async buscarEstudanteEmail(email: string) {
    const result = await this.getConnection()
      .select("*")
      .from("Estudante")
      .where({ email });

    return result[0];
  }

  async buscarEstudanteNome(nome: string): Promise<Estudante | undefined> {
    const result = await this.getConnection()
      .select("*")
      .from("Estudante")
      .where({ nome });

    if (!result.length) {
      return undefined;
    }

    return new Estudante(
      result[0].nome,
      result[0].email,
      result[0].data_nascimento,
      result[0].turma_id,
      result[0].id
    );
  }

  async buscarEstudanteId(id: string): Promise<Estudante | undefined> {
    const result = await this.getConnection()
      .select("*")
      .from("Estudante")
      .where({ id });

    if (!result.length) {
      return undefined;
    }

    return new Estudante(
      result[0].nome,
      result[0].email,
      result[0].data_nascimento,
      result[0].turma_id,
      result[0].id
    );
  }

  async mudarEstudanteTurma(id:string, turmaId:string): Promise<string> {
       await this.getConnection().update({turma_id: turmaId}).into("Estudante").where({id})

       return `Estudante foi trocado para a turma ${turmaId}`
  }
}