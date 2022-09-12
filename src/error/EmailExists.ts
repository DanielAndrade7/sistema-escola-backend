import { BaseError } from "./BaseError";

export class EmailExists extends BaseError {
  constructor() {
    super("Email ja existe no sistema", 401);
  }
}
