<script lang="ts">
	let { activeFact, fact, label, select } = $props<{
		activeFact: string;
		fact: string;
		label: string;
		select: () => void;
	}>();
</script>

<button onclick={select} class="badge {activeFact === fact ? 'badge-warning' : 'badge-outline'}"
	>{label}</button
>
