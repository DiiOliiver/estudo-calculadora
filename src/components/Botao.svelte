<script lang="ts">
    import "../../public/style/components/botao.css";

    export let texto: string;
    export let triplo: boolean = false;
    export let duplo: boolean = false;

    export let operacao: boolean = false;
    export let destaque: boolean = false;

    export let onClick: (valor: string) => void = () => {};
</script>

<button
    class="botao"
    class:triplo class:duplo class:operacao class:destaque
    on:click={() => onClick(texto)}
>
    { texto }
</button>