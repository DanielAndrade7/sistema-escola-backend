import { BaseError } from "./BaseError";

export class EstudanteInexiste extends BaseError {
  constructor() {
    super("Estudante não cadastrado", 404);
  }
}
