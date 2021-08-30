<script lang="ts">
    import "../../public/style/components/calculadora.css";
    import Tela from "./Tela.svelte";
    import Linha from "./Linha.svelte";
    import Botao from "./Botao.svelte";
    import CalculadoraModel from "../model/CalculadoraModel";

    let calc = new CalculadoraModel();
    const numeroDigitado = (numero: string) => calc = calc.numeroDigitado(numero);
    const operacaoDigitada = (operacao: string) => calc = calc.operacaoDigitada(operacao);
    const pontoDigitado = () => calc = calc.pontoDigitado();
    const calcular = () => calc = calc.calcular();
    const limpar = () => calc = calc.limpar();
</script>

<div class="calculadora">
    <Tela valor={calc.valor} />
    <Linha>
        <Botao destaque triplo texto="AC" onClick={limpar} />
        <Botao operacao texto="/" onClick={operacaoDigitada} />
    </Linha>
    <Linha>
        <Botao texto="7" onClick={numeroDigitado} />
        <Botao texto="8" onClick={numeroDigitado} />
        <Botao texto="9" onClick={numeroDigitado} />
        <Botao operacao texto="*" onClick={operacaoDigitada} />
    </Linha>
    <Linha>
        <Botao texto="4" onClick={numeroDigitado} />
        <Botao texto="5" onClick={numeroDigitado} />
        <Botao texto="6" onClick={numeroDigitado} />
        <Botao operacao texto="+" onClick={operacaoDigitada} />
    </Linha>
    <Linha>
        <Botao texto="1" onClick={numeroDigitado} />
        <Botao texto="2" onClick={numeroDigitado} />
        <Botao texto="3" onClick={numeroDigitado} />
        <Botao operacao texto="-" onClick={operacaoDigitada} />
    </Linha>
    <Linha> 
        <Botao duplo texto="0" onClick={numeroDigitado} />
        <Botao texto="," onClick={pontoDigitado} />
        <Botao destaque texto="=" onClick={calcular} />
    </Linha>
</div>
