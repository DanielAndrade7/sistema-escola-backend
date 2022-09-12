import { BaseError } from "./BaseError";

export class MissingFields extends BaseError{
    constructor() {
        super("Faltando parametros", 404)
    }
}