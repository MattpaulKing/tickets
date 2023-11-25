<script lang="ts">
	import * as echarts from 'echarts';
	import type { Functions, KpiFact } from '$lib/types/db';
	import KpiAction from './KpiAction.svelte';
	type ChartData = Record<string, Functions<'event_type_aggs_by_month'>>;
	let { chartData } = $props<{ chartData: ChartData }>();
	let chartContainer: HTMLDivElement;
	let fact = $state<KpiFact>('averagePrice');

	$effect(() => {
		let datasets = [];
		let series = [];
		let idx = 0;
		for (const prop in chartData) {
			datasets.push({
				dimensions: ['created_at', fact],
				source: chartData[prop]
			});
			series.push({
				name: prop,
				type: 'line',
				datasetIndex: idx,
				smooth: true
			});
			idx++;
		}
		let chart = echarts.init(chartContainer, null, { renderer: 'canvas' });
		let option = {
			dataset: datasets,
			xAxis: {
				type: 'time'
			},
			yAxis: {
				type: 'value',
				splitLine: {
					show: false
				},
				axisLine: {
					show: true
				},
				min: 'dataMin'
			},
			legend: {
				orient: 'horizontal',
				icon: 'rect',
				top: 20,
				left: 0,
				textStyle: {
					color: '#ffffff'
				}
			},
			grid: {
				containLabel: true,
				left: 0,
				top: 80,
				right: 20,
				bottom: 0
			},
			tooltip: {
				trigger: 'axis',
				valueFormatter: (value: number) => value.toFixed(3),
				backgroundColor: 'rgba(0, 0, 0, .8)',
				textStyle: {
					color: '#ffffff'
				}
			},
			series: series
		};
		chart.setOption(option);
	});
</script>

<div class="w-full h-[400px]" bind:this={chartContainer} />
<div class="card-actions justify-start mt-8 ml-8">
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
