<script lang="ts">
	$: document.title = "Olá Svelte";
	import "../public/style/app.css";
	import {
		AppBar, Avatar, Alert, Button, Divider, Dialog, Overlay,
		ProgressCircular, Icon, List, ListItem, MaterialApp,
		NavigationDrawer
	} from "svelte-materialify";
	import { mdiGithub, mdiLinkedin, mdiInstagram } from "@mdi/js";
	import Calculadora from "./components/Calculadora.svelte";
	
	let mini: boolean = true;
	let loading: boolean = false;
	let dialog: boolean;
	let tipoRedirecionamento: string;

	function mouseenter(): void {
		mini = false;
	}
	function mouseleave(): void {
		mini = true;
	}
	function openDialog(tipo: string): void {
		tipoRedirecionamento = tipo;
		dialog = true;
	}
	function closeDialog(): void {
		dialog = false;
	}
	function capitalize(string: string): string {
		if (!string) {
			return string;
		}
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}
	function redirecionar(): void {
		loading = true;
		dialog = false;
		const redirecionamentos: Object = {
			"LINKEDIN": "https://www.linkedin.com/in/diioliiver",
			"GITHUB": "https://github.com/DiiOliiver",
			"INSTAGRAM": "https://instagram.com/diioliiver",
		};
		const url: string = redirecionamentos[tipoRedirecionamento];
		const headers = new Headers();
		const config: Object = {
			method: 'GET',
			headers: headers,
			mode: 'cors',
			cache: 'default'
		};
		const request = new Request(url, config);
		fetch(request).finally(() => {
			loading = false;
			tipoRedirecionamento = "";
		});
	}
</script>

<MaterialApp>
	<AppBar fixed class="appbar">
		<span slot="title"> Projeto de calculadora com Svelte.js </span>
		<div style="flex-grow:1" />
		<Divider vertical inset class="ml-4" />
		<Button text class="mr-8">Svelte.js</Button>
	</AppBar>
	<div class="d-inline-block" on:mouseenter={mouseenter} on:mouseleave={mouseleave}>
		<NavigationDrawer {mini} fixed style="margin-top: 9vh">
			<ListItem>
				<span slot="prepend" class="ml-n2">
					<Avatar size={40}>
						<img src="https://github.com/DiiOliiver.png" alt="diego" />
					</Avatar>
				</span>
				Oliveira, Diego!
			</ListItem>
			<Divider />
			<List dense nav>
				<ListItem on:click={() => openDialog("LINKEDIN")}>
					<span slot="prepend">
						<Icon path={mdiLinkedin} />
					</span>
					Linkedin
				</ListItem>
				<ListItem on:click={() => openDialog("GITHUB")}>
					<span slot="prepend">
						<Icon path={mdiGithub} />
					</span>
					Github
				</ListItem>
				<ListItem on:click={() => openDialog("INSTAGRAM")}>
					<span slot="prepend">
						<Icon path={ mdiInstagram } />
					</span>
					Instagram
				</ListItem>
			</List>
		</NavigationDrawer>
		<Dialog persistent :transition="2" class="pa-4 text-center" bind:active={dialog}>
			<Alert class="warning-text" border="left" coloredBorder>
				<span style="font-size: 21px">
					O {capitalize(tipoRedirecionamento)} será aberto em outra página,<br />
					deseja continuar?
				</span>
			</Alert>
			<div class="text-right">
				<Button
					outlined
					size="small"
					class="grey-text"
					on:click={() => closeDialog()}
				>
					Fechar
				</Button>
				<Button
					outlined
					size="small"
					class="red-text"
					on:click={() => redirecionar()}>
					Redirecionar
				</Button>
			</div>
		</Dialog>
	</div>

	<main>
		<Calculadora />
	</main>

	<Overlay active={loading}>
		<ProgressCircular color="red" indeterminate size={128} />
	</Overlay>
</MaterialApp>