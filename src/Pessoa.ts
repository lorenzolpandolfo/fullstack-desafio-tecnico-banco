import { Auxiliar } from "./Auxiliar";

function exigirTexto(valor: string, campo: string): void {
  if (typeof valor !== "string" || valor.trim().length === 0) {
    throw new Error(`${campo} e obrigatorio.`);
  }
}

function exigirValorNaoNegativo(valor: number, campo: string): void {
  if (!Number.isFinite(valor) || valor < 0) {
    throw new Error(`${campo} deve ser um valor nao negativo.`);
  }
}

export abstract class Pessoa {
  static NumeroDePessoas = 0;

  Id = 0;

  constructor(
    public Endereco: string,
    public Tel: string,
    public Email: string,
  ) {
    exigirTexto(Endereco, "Endereco");
    exigirTexto(Tel, "Tel");
    exigirTexto(Email, "Email");
  }

  protected registrarPessoa(): void {
    this.Id = ++Pessoa.NumeroDePessoas;
  }
}

export class PessoaFisica extends Pessoa {
  constructor(
    Endereco: string,
    Tel: string,
    Email: string,
    public Nome: string,
    public Sobrenome: string,
    public Rg: string,
    public Cpf: string,
    public readonly DataNasc: Date,
    public Renda: number,
  ) {
    super(Endereco, Tel, Email);
    exigirTexto(Nome, "Nome");
    exigirTexto(Sobrenome, "Sobrenome");
    exigirTexto(Rg, "Rg");
    exigirTexto(Cpf, "Cpf");
    Auxiliar.CalculaIdade(DataNasc);
    exigirValorNaoNegativo(Renda, "Renda");
    this.registrarPessoa();
  }

  get Idade(): number {
    return Auxiliar.CalculaIdade(this.DataNasc);
  }

  get FaixaEtaria(): string {
    return Auxiliar.FaixaEtaria(this.Idade);
  }
}

export class PessoaJuridica extends Pessoa {
  constructor(
    Endereco: string,
    Tel: string,
    Email: string,
    public Socios: PessoaFisica[],
    public Cnpj: number,
    public RazaoSocial: string,
    public NomeFantasia: string,
    public InscrEstadual: number,
    public readonly DataAbertura: Date,
    public Faturamento: number,
  ) {
    super(Endereco, Tel, Email);
    if (!Array.isArray(Socios) || Socios.length === 0 ||
      Socios.some((socio) => !(socio instanceof PessoaFisica))) {
      throw new Error("Socios deve conter ao menos uma PessoaFisica.");
    }
    if (!Number.isSafeInteger(Cnpj) || Cnpj <= 0) {
      throw new Error("Cnpj deve ser um numero inteiro positivo.");
    }
    exigirTexto(RazaoSocial, "RazaoSocial");
    exigirTexto(NomeFantasia, "NomeFantasia");
    if (!Number.isSafeInteger(InscrEstadual) || InscrEstadual <= 0) {
      throw new Error("InscrEstadual deve ser um numero inteiro positivo.");
    }
    Auxiliar.CalculaIdade(DataAbertura);
    exigirValorNaoNegativo(Faturamento, "Faturamento");
    this.registrarPessoa();
  }

  get Idade(): number {
    return Auxiliar.CalculaIdade(this.DataAbertura);
  }
}
