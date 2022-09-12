export class Estudante {
  private id: string | undefined = Math.floor(Date.now() * Math.random()).toString(36);
  private nome: string;
  private email: string;
  private dataNascimento: string;
  private idTurma: string;

  constructor(
    nome: string,
    email: string,
    dataNascimento: string,
    idTurma: string,
    id?: string
  ) {
    this.nome = nome;
    this.email = email;
    this.dataNascimento = dataNascimento;
    this.idTurma = idTurma;
    this.id = id
  }

  getId() {
    return this.id;
  }

  getNome() {
    return this.nome;
  }

  getNascimento() {
    return this.dataNascimento;
  }

  getEmail() {
    return this.email;
  }

  getTurmaId() {
    return this.idTurma;
  }
}