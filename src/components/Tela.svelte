<script lang="ts">
    import "../../public/style/components/tela.css";
    export let valor: string

    $: tamanhoFonte = valor.length > 20 ?
        "pequena" : `s-${valor.length}`;
</script>

<div class={`tela ${tamanhoFonte}`}>
    <span>{ valor }</span>
</div>
