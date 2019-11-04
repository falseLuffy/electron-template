<template>
    <div class="radar" ref="radarContainer">
        <div class="radarChart" ref="radarChart"></div>
    </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'radarChart',
    props: {
      data: {
        type: Array,
        default () {
          return [
            {}, {}
          ]
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
        this.$refs.radarChart.style.width = this.$refs.radarContainer.clientWidth + 'px'
        this.$refs.radarChart.style.height = this.$refs.radarContainer.clientHeight + 'px'
      },
      initChart () {
        this.chart = echarts.init(this.$refs.radarChart)
        const indicator = []
        const data = []
        this.data.forEach((item, index) => {
          data.push({
            value: item.value,
            name: 'name' + index,
            itemStyle: {
              color: '#dd93ff'
            },
            areaStyle: {
              color: 'rgba(221, 147, 225, 0.5)'
            }
          })
          indicator.push({
            name: item.name,
            max: item.total
          })
        })
        const options = {
          radar: {
            name: {
              textStyle: {
                color: '#95e1ff',
                backgroundColor: 'transparent',
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            radius: '55%',
            splitNumber: 3,
            indicator: indicator,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            splitArea: {
              areaStyle: {
                color: ['rgba(61, 246, 255, 0.5)', 'rgba(61, 246, 255, 0.4)', 'rgba(61, 246, 255, 0.3)', 'rgba(61, 246, 255, 0.2)', 'rgba(61, 246, 255, 0.1)']
              }
            }
          },
          series: [{
            name: '领域分布',
            type: 'radar',
            data: data
          }]
        }
        this.chart.setOption(options)
      }
    },
    watch: {
      data () {
        this.chart.dispose()
        this.initChart()
      }
    }
  }
</script>

<style scoped>
    .radar {
        width: 100%;
        height: 100%;
    }
</style>
