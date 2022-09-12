import { app } from "./app";
import { EstudanteEndpoint } from "./endpoints.ts/Estudante";
import { TurmaEndpoint } from "./endpoints.ts/Turma";

const turma = new TurmaEndpoint()
const estudante = new EstudanteEndpoint();

app.post("/criarTurma", turma.criarTurma)
app.get("/buscarTurmasAtivas", turma.ativa)
app.post("/mudarModulo/:id", turma.mudaModulo)

app.post("/criarEstudante", estudante.criar)
app.get("/estudante/:nome", estudante.buscar)
app.post("/mudarEstudante/:id", estudante.mudarDeTurma)

    