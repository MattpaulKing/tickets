<script lang="ts">
	import type { Functions, KpiFact } from '$lib/types/db';
	import * as echarts from 'echarts';
	import theme from '$lib/components/charts/chartTheme';
	import { kpiOptions } from './KpiChartOptions';
	import KpiAction from './KpiAction.svelte';
	type Props = { title: string; chartData: Functions<'event_type_aggs_by_month'> };
	let { title, chartData } = $props<Props>();
	let chartContainer: HTMLDivElement;
	let fact = $state<KpiFact>('averagePrice');
	$effect(() => {
		echarts.registerTheme('walden', theme);
		let chart = echarts.init(chartContainer, 'walden');
		let option = kpiOptions(fact, chartData);
		chart.setOption(option);
	});
	let kpiVal = $derived((fact: KpiFact) => {
		switch (fact) {
			case 'highestPrice':
				return chartData.reduce((curr, row) => {
					return curr < row.highestPrice ? row.highestPrice : curr;
				}, 0);
			default:
				return (
					chartData.reduce((curr, row: Functions<'event_type_aggs_by_month'>[0]) => {
						return (curr += row[fact]);
					}, 0) / chartData.length
				);
		}
	});
	const minCreated = chartData.reduce((curr, row) => {
		let rowCreated = new Date(row.created_at);
		return curr < rowCreated ? rowCreated : curr;
	}, new Date());
	const maxCreated = chartData.reduce((curr, row) => {
		let rowCreated = new Date(row.created_at);
		return curr > rowCreated ? rowCreated : curr;
	}, new Date('1999-01-01'));
</script>

<div class="card w-96 bg-base-300 shadow-2xl rounded-xl">
	<div class="card-body">
		<div class="relative w-full">
			<div bind:this={chartContainer} class="w-full h-[150px]" />
		</div>
		<div class="flex justify-between place-items-center">
			<h2 class="card-title capitalize text-gray-300">
				{title.replaceAll('_', ' ')}
			</h2>
			<div class="stat text-right">
				<div class="stat-value text-2xl">{kpiVal(fact).toFixed(3)}</div>
				<div class="stat-desc">
					{minCreated.toString().slice(0, 10)} - {maxCreated.toString().slice(0, 10)}
				</div>
			</div>
		</div>
		<div class="card-actions justify-between">
			<KpiAction
				label="Average"
				fact="averagePrice"
				select={() => (fact = 'averagePrice')}
				activeFact={fact}
			/>
			<KpiAction
				label="Max"
				fact="highestPrice"
				select={() => (fact = 'highestPrice')}
				activeFact={fact}
			/>
			<KpiAction
				label="Popularity"
				fact="eventPopularity"
				select={() => (fact = 'eventPopularity')}
				activeFact={fact}
			/>
			<KpiAction
				label="Score"
				fact="eventScore"
				select={() => (fact = 'eventScore')}
				activeFact={fact}
			/>
		</div>
	</div>
</div>
