import { BaseError } from "./BaseError";

export class TurmaInvalida extends BaseError {
  constructor() {
    super("Turma não existe no banco de dados!", 404);
  }
}
