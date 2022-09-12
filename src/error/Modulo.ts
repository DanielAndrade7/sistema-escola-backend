import { BaseError } from "./BaseError";

export class Modulo extends BaseError {
    constructor() {
        super("O modulo deve estar entre 1 e 6", 401)
    }
}