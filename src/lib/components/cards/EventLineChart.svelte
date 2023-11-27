<script lang="ts">
	import * as echarts from 'echarts';
	import type { KpiFact, Tables } from '$lib/types/db';
	import KpiAction from './KpiAction.svelte';
	type ChartData = { eventId: number; watchedEvents: Tables<'sgEventsUpcoming'>[] };
	let { chartData } = $props<{ chartData: ChartData }>();
	let chartContainer: HTMLDivElement;
	let fact = $state<KpiFact>('averagePrice');

	$effect(() => {
		let chart = echarts.init(chartContainer, 'walden', { renderer: 'canvas' });
		let option = {
			dataset: {
				dimensions: ['created_at', fact],
				source: chartData
			},
			series: {
				name: chartData.watchedEvents[0].title ?? 'Unknown',
				type: 'line',
				smooth: true
			},
			xAxis: {
				type: 'time',
				splitLine: {
					show: true
				}
			},
			yAxis: {
				type: 'value',
				splitLine: {
					show: true
				},
				axisLine: {
					show: true
				},
				axisLabel: {
					showMinLabel: false,
					showMaxLabel: false,
					formatter: function (value: number | string) {
						return value.toString().split('.')[0];
					}
				}
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
			}
		};
		chart.setOption(option);
	});
</script>

<div class="w-full h-[550px]" bind:this={chartContainer} />
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
