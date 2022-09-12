import { Request, Response } from "express";
import { EstudanteData } from "../data/EstudanteData";
import { TurmaData } from "../data/TurmaData";
import { EmailExists } from "../error/EmailExists";
import { MissingFields } from "../error/MissingFields";
import { TurmaInvalida } from "../error/TurmaInvalida";
import { Estudante } from "../model/ModelEstudante";
import moment from "moment"
import { EstudanteInexiste } from "../error/EstudanteInexistente";

export class EstudanteEndpoint {

    async criar(req: Request, res: Response) {
        try {
           const { nome, email, dataNascimento, idTurma } = req.body;

           if (!nome || !email || !dataNascimento || !idTurma) {
             throw new MissingFields();
           }

           const estudanteData = new EstudanteData();

           const emailExiste = await estudanteData.buscarEstudanteEmail(email);

           if (emailExiste) {
             throw new EmailExists();
           }

           const turmaData = new TurmaData()
           const idTurmaExiste = await turmaData.buscarTurmaPeloId(idTurma)

           if(!idTurmaExiste.length) {
            throw new TurmaInvalida()
           }

           const dataConvertida = moment(dataNascimento,"DD/MM/YYYY").format("YYYY-MM-DD")

           const estudante = new Estudante(nome, email, dataConvertida, idTurma)

           const response = await estudanteData.criarEstudante(estudante)

           res.status(201).send({message:response})

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        } 
    }

    async buscar(req: Request, res: Response) {
        try {
            const nome = req.params.nome

            const estudanteData = new EstudanteData()

            const buscarEstudanteNome = await estudanteData.buscarEstudanteNome(nome)

            if(!buscarEstudanteNome) {
                throw new EstudanteInexiste()
            }

            res.status(201).send(buscarEstudanteNome)

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    async mudarDeTurma(req: Request, res: Response) {
        try {
           const id = req.params.id
           const {turmaId} = req.body
           
           const estudanteData = new EstudanteData()

           const estudanteExiste = await estudanteData.buscarEstudanteId(id)

           if(!estudanteExiste){
            throw new EstudanteInexiste()
           }
           
           const turmaData = new TurmaData()

           const idTurmaExiste = await turmaData.buscarTurmaPeloId(turmaId);

           if (!idTurmaExiste.length) {
             throw new TurmaInvalida();
           }

           const response = await estudanteData.mudarEstudanteTurma(id, turmaId)

           res.status(201).send({response})

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }
}