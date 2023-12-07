<script lang="ts">
	let { activeFact, fact, label, select } = $props<{
		activeFact: string;
		fact: string;
		label: string;
		select: () => void;
	}>();
</script>

<button
	onclick={select}
	class="badge transition-colors duration-300 {activeFact === fact
		? 'badge-neutral'
		: 'badge-outline hover:bg-neutral hover:text-base-content'}">{label}</button
>
