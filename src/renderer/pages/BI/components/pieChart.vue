<template>
    <div class="chart-container" ref="pieContainer">
        <div class="pie" ref="pie"></div>
    </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'pieChart',
    props: {
      gradual: {
        type: Array,
        default () {
          return ['red', 'blue']
        }
      },
      data: {
        type: Object,
        default () {
          return {
            rate: '0%',
            value: 0
          }
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
        window.addEventListener('resize', this.resizeChart)
      },
      initDom () {
        this.$refs.pie.style.width = this.$refs.pieContainer.clientWidth + 'px'
        this.$refs.pie.style.height = this.$refs.pieContainer.clientHeight + 'px'
      },
      initChart () {
        this.chart = echarts.init(this.$refs.pie)
        this.loadingChart(this.data)
      },
      loadingChart (data) {
        const options = {
          title: {
            show: true,
            text: data.rate,
            left: 'center',
            top: 35,
            textStyle: {
              fontFamily: 'TRENDS',
              fontSize: 26,
              color: '#95e1ff',
              fontWeight: 'normal'
            }
          },
          series: [
            {
              type: 'pie',
              radius: ['78%', '93%'],
              avoidLabelOverlap: false,
              hoverOffset: 0,
              label: {
                show: true,
                position: 'center',
                color: '#95e1ff',
                padding: [40, 0, 0, 0],
                textStyle: {
                  fontFamily: 'TRENDS',
                  fontSize: 20,
                  fontWeight: 'normal'
                }
              },
              data: [
                {
                  value: data.value,
                  name: data.value + '件',
                  itemStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0.3, color: this.gradual[0] // 0% 处的颜色
                      }, {
                        offset: 0.8, color: this.gradual[1] // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                    }
                  }
                },
                {
                  value: data.value * 100 / parseInt(data.rate),
                  name: '',
                  itemStyle: {
                    color: 'transparent'
                  }
                }
              ]
            },
            {
              type: 'pie',
              radius: ['97%', '99%'],
              avoidLabelOverlap: false,
              hoverOffset: 0,
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  color: '#95e1ff',
                  textStyle: {
                    fontSize: 14
                  }
                }
              },
              data: [
                {
                  value: 100,
                  name: '',
                  itemStyle: {
                    color: this.gradual[0]
                  }
                }
              ]
            }
          ]
        }
        this.chart.setOption(options)
      },
      resizeChart () {
        this.initDom()
        this.chart.resize()
      }
    },
    watch: {
      data () {
        this.loadingChart({
          rate: '0%',
          value: 0
        })
        this.loadingChart(this.data)
      }
    },
    destroyed () {
      window.removeEventListener('resize', this.resizeChart)
    }
  }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        height: 100%;
    }
</style>
