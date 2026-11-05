import { Pessoa, PessoaFisica, PessoaJuridica } from "./Pessoa";

function exigirValorPositivo(valor: number, campo: string): void {
  if (!Number.isFinite(valor) || valor <= 0) {
    throw new Error(`${campo} deve ser um valor positivo.`);
  }
}

export interface Depositavel {
  Depositar(valor: number): void;
}

export abstract class Conta {
  private saldo = 0;

  constructor(
    public Titular: Pessoa,
    public Numero: number,
    public Agencia: number,
    public readonly TaxaSaque = 0,
  ) {
    if (!(Titular instanceof Pessoa)) throw new Error("Titular invalido.");
    if (!Number.isSafeInteger(Numero) || Numero <= 0) {
      throw new Error("Numero da conta deve ser um inteiro positivo.");
    }
    if (!Number.isSafeInteger(Agencia) || Agencia <= 0) {
      throw new Error("Agencia deve ser um inteiro positivo.");
    }
    if (!Number.isFinite(TaxaSaque) || TaxaSaque < 0) {
      throw new Error("TaxaSaque deve ser um valor nao negativo.");
    }
  }

  get Saldo(): number {
    return this.saldo;
  }

  ConsultarSaldo(): number {
    return this.saldo;
  }

  Sacar(valor: number): void {
    exigirValorPositivo(valor, "Valor do saque");
    this.validarNovoSaldo(this.saldo - valor - this.TaxaSaque);
    this.saldo -= valor + this.TaxaSaque;
  }

  Transferir(conta: Conta, valor: number): void {
    exigirValorPositivo(valor, "Valor da transferencia");
    if (!(conta instanceof Conta)) throw new Error("Conta de destino invalida.");
    this.validarTransferencia(conta);
    if (conta === this) return;

    this.validarNovoSaldo(this.saldo - valor);
    this.saldo -= valor;
    conta.receberTransferencia(valor);
  }

  protected validarTransferencia(_conta: Conta): void {}

  protected get LimiteNegativo(): number {
    return 0;
  }

  protected validarNovoSaldo(novoSaldo: number): void {
    if (novoSaldo < -this.LimiteNegativo) {
      throw new Error("Saldo insuficiente ou limite excedido.");
    }
  }

  protected creditar(valor: number): void {
    exigirValorPositivo(valor, "Valor do deposito");
    this.saldo += valor;
  }

  private receberTransferencia(valor: number): void {
    this.saldo += valor;
  }
}

export function rendaDoTitular(titular: Pessoa): number {
  if (titular instanceof PessoaFisica) return titular.Renda;
  if (titular instanceof PessoaJuridica) return titular.Faturamento;
  throw new Error("Tipo de titular nao suportado.");
}
