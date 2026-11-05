import { Conta, Depositavel } from "./Conta";

export class ContaPoupanca extends Conta implements Depositavel {
  constructor(Titular: Conta["Titular"], Numero: number, Agencia: number) {
    super(Titular, Numero, Agencia, 1);
  }

  Depositar(valor: number): void {
    this.creditar(valor);
  }
}
