import { Request, Response } from "express";
import { MissingFields } from "../error/MissingFields";
import { BaseError } from "../error/BaseError";
import { Turma } from "../model/ModelTurma";
import { TurmaData } from "../data/TurmaData";
import { Modulo } from "../error/Modulo";



export class TurmaEndpoint {

    async criarTurma(req: Request, res: Response) {
        try {
            const { nome } = req.body

            if(!nome) {
                throw new MissingFields()
            }

            const turma = new Turma(nome)
            const turmaData = new TurmaData()

            const response = await turmaData.criar(turma)

            res.status(201).send(response)

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    async ativa(req: Request, res: Response){
        try {
            const turmaData = new TurmaData()

            const turmasAtivas = await turmaData.selecionarTurmasAtivas()
            res.status(200).send(turmasAtivas)

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    async mudaModulo(req: Request, res: Response) {
        try {
            const id = req.params.id
            const {modulo} = req.body

            if(!modulo){
                throw new MissingFields()
            }

            if(modulo < 0 || modulo > 6){
                throw new Modulo()
            }

            const turmaData = new TurmaData()

            const response = await turmaData.mudarModulo(id, modulo)

            res.status(201).send({response})

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

}