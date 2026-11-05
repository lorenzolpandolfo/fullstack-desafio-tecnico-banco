export class Auxiliar {
  private constructor() {}

  static CalculaIdade(data: Date): number {
    if (!(data instanceof Date) || Number.isNaN(data.getTime())) {
      throw new Error("Data invalida.");
    }

    const hoje = new Date();
    if (data.getTime() > hoje.getTime()) {
      throw new Error("A data nao pode estar no futuro.");
    }

    let idade = hoje.getFullYear() - data.getFullYear();
    const aindaNaoFezAniversario =
      hoje.getMonth() < data.getMonth() ||
      (hoje.getMonth() === data.getMonth() && hoje.getDate() < data.getDate());

    if (aindaNaoFezAniversario) idade -= 1;
    return idade;
  }

  static FaixaEtaria(idade: number): string {
    if (!Number.isInteger(idade) || idade < 0) {
      throw new Error("Idade invalida.");
    }
    if (idade <= 11) return "criança";
    if (idade <= 21) return "jovem";
    if (idade <= 59) return "adulto";
    return "idoso";
  }
}
