import { Conta } from "./Conta";

export class ContaSalario extends Conta {
  constructor(Titular: Conta["Titular"], Numero: number, Agencia: number) {
    super(Titular, Numero, Agencia, 0);
  }

  protected validarTransferencia(conta: Conta): void {
    if (conta.Titular.Id !== this.Titular.Id) {
      throw new Error("Conta salario so pode transferir para contas do mesmo titular.");
    }
  }
}
