<template>
    <div class="pieChart" ref="box">
        <div class="chart-container" ref="container"></div>
    </div>
</template>

<script>
  import Highcharts from 'highcharts'
  import Highcharts3D from 'highcharts/highcharts-3d'

  export default {
    name: 'PieChart-3d',
    props: {
      data: {
        type: Array,
        default () {
          return []
        }
      }
    },
    created () {
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.initDom()
        this.initChart()
      },
      initDom () {
        this.$refs.container.style.width = this.$refs.box.clientWidth + 'px'
        this.$refs.container.style.height = this.$refs.box.clientHeight + 'px'
      },
      initChart () {
        Highcharts3D(Highcharts)
        const options = {
          title: {
            text: null
          },
          chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            margin: 20,
            options3d: {
              enabled: true,
              alpha: 45,
              beta: 0,
              viewDistance: 5
            }
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'],
          credits: {
            enabled: false // 禁用版权url    此处不设置，  会显示highecharts.com
          },
          legend: {
            align: 'right',
            verticalAlign: 'middle',
            width: 140,
            padding: 0,
            margin: 0,
            lineHeight: 44,
            itemStyle: {
              color: '#95e1ff',
              lineHeight: 18
            },
            labelFormat: '{name}<br>{y}件   {percentage:.2f}%'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              depth: 25, // 饼图厚度
              pie: {
                size: '100%'
              },
              dataLabels: {
                enabled: false
              },
              showInLegend: {
                enabled: true
              }
            }
          },
          series: [
            {
              type: 'pie',
              name: 'pieChart-3d',
              startAngle: 90, // 调整饼图的角度   方向：顺时针
              colors: [
                {
                  linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                  stops: [
                    [0, '#fff4b4'], // start
                    [1, '#ffe06d'] // end
                  ]
                },
                {
                  linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                  stops: [
                    [0, '#9cb0ff'], // start
                    [1, '#3e7dee'] // end
                  ]
                },
                {
                  linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                  stops: [
                    [0, '#a2e7f8'], // start
                    [1, '#45cff1'] // end
                  ]
                },
                {
                  linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                  stops: [
                    [0, '#fdbb8b'], // start
                    [1, '#fb8653'] // end
                  ]
                }
              ],
              allowPointSelect: false,
              slicedOffset: 7,
              data: this.data.map(item => {
                return {
                  ...item,
                  y: item.value
                }
              }),
              pointInterval: 7,
              center: ['35%', '50%']
            }
          ]
        }
        this.chart = Highcharts.chart(this.$refs.container, options)
      }
    },
    watch: {
      data () {
        this.chart.destroy()
        this.initChart()
      }
    }
  }
</script>

<style scoped lang="scss">
    .pieChart {
        width: 100%;
        height: 100%;
    }
</style>
