const LIMPAR_TELA: boolean = true;
const NAO_LIMPAR_TELA: boolean = false;

export default class CalculadoraModel {
    #valor: string;
    #acumulador: number;
    #limparTela: boolean;
    #operacao: string;

    constructor(
        valor: string = null,
        acumulador: number = null,
        operacao: string = null,
        limparTela: boolean = false
    ) {
        this.#valor = valor;
        this.#acumulador = acumulador;
        this.#operacao = operacao;
        this.#limparTela = limparTela;
    }

    get valor(): string {
        return this.#valor?.replace(".", ",") || "0";
    }

    numeroDigitado(novoValor: string) {
        const valor: string = (this.#limparTela || !this.#valor) ?
            novoValor :
            this.#valor + novoValor;

        return new CalculadoraModel(
            valor,
            this.#acumulador,
            this.#operacao,
            NAO_LIMPAR_TELA
        );
    }

    pontoDigitado() {
        const valor: string = this.#valor?.includes(".") ?
            this.#valor :
            this.#valor + ".";

        return new CalculadoraModel(
            valor,
            this.#acumulador,
            this.#operacao,
            NAO_LIMPAR_TELA
        );
    }

    limpar() {
        return new CalculadoraModel();
    }

    operacaoDigitada(proximaOperacao: string) {
        return this.calcular(proximaOperacao);
    }

    calcular(
        proximaOperacao: string = null
    ) {
        const acumulador: number = !this.#operacao ? parseFloat(this.#valor) : this.valorCalculado();

        const valor: string = !this.#operacao ? this.#valor : `${acumulador}`;

        const isLimpaTela: boolean = proximaOperacao ?
            LIMPAR_TELA : NAO_LIMPAR_TELA;

        return new CalculadoraModel(
            valor,
            acumulador,
            proximaOperacao,
            isLimpaTela
        );
    }

    valorCalculado() {
        const formulas = {
            "+": Number(this.#acumulador) + Number(this.#valor),
            "-": Number(this.#acumulador) - Number(this.#valor),
            "*": Number(this.#acumulador) * Number(this.#valor),
            "/": Number(this.#acumulador) / Number(this.#valor),
        }

        return formulas[this.#operacao];
    }
}