import type { Functions } from "$lib/types/db"

export function kpiOptions(fact: string, chartData: Functions<"event_type_aggs_by_month">) {
  return {
			dataset: {
				dimensions: ['created_at', fact],
				source: chartData
			},
			xAxis: {
				type: 'time',
        min: 'dataMin',
			},
			yAxis: {
				type: 'value',
				splitLine: {
					show: false
				},
				axisLine: {
					show: true,
				},
        min: 'dataMin',
        axisLabel: {
          showMinLabel: false,
          showMaxLabel: false,
          formatter: function (value: number | string) {
            return value.toString().split(".")[0]
          }
        }
			},
			grid: {
				containLabel: true,
				left: 0,
				top: 0,
				right: 0,
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
			series: [
				{
          name: chartData[0].eventType,
					type: 'line',
					color: '#f6d860',
          smooth: true,
				}
			]
		}
}
