import { Conta, Depositavel, rendaDoTitular } from "./Conta";

export class ContaCorrente extends Conta implements Depositavel {
  readonly Tipo: string;
  readonly Limite: number;
  readonly TaxaDoLimite: number;

  constructor(
    Titular: Conta["Titular"],
    Numero: number,
    Agencia: number,
    Tipo: string,
  ) {
    super(Titular, Numero, Agencia);
    if (Tipo !== "SIMPLES" && Tipo !== "ESPECIAL") {
      throw new Error("Tipo deve ser SIMPLES ou ESPECIAL.");
    }

    const renda = rendaDoTitular(Titular);
    if (Tipo === "ESPECIAL" && renda <= 5000) {
      throw new Error("Conta especial exige renda ou faturamento superior a R$ 5.000,00.");
    }

    this.Tipo = Tipo;
    this.Limite = renda * (Tipo === "ESPECIAL" ? 2.5 : 1.5);
    this.TaxaDoLimite = Tipo === "ESPECIAL" ? 0.02 : 0.05;
  }

  protected get LimiteNegativo(): number {
    return this.Limite;
  }

  Depositar(valor: number): void {
    this.creditar(valor);
  }

  Pagar(codigoBarras: string): void {
    if (typeof codigoBarras !== "string" || codigoBarras.trim().length === 0) {
      throw new Error("Codigo de barras e obrigatorio.");
    }
  }

  Emprestimo(valor: number): void {
    this.creditar(valor);
  }
}
