<template>
  <div class="barchart-wrap" ref="chartWrap">
    <div class="barChart" ref="barChart"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'barChart',
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.initDom()
        this.initChart()
        window.addEventListener('resize', this.resizeChart)
      },
      initDom() {
        this.$refs.barChart.style.width = this.$refs.chartWrap.clientWidth + 'px'
        this.$refs.barChart.style.height = this.$refs.chartWrap.clientHeight + 'px'
      },
      initChart() {
        this.chart = echarts.init(this.$refs.barChart)
        const data = this.data
        const symbolSize = [50, 12]
        let total = 0
        data.forEach((item) => {
          total += item.value
        })
        const option = {
          tooltip: {},
          xAxis: {
            data: ['行政执法纠正违法\n或履行职责', '逾期未纠正违法\n或履行职责', '未到二月回复期'],
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              interval: 0,
              margin: 14,
              textStyle: {
                color: '#95e1ff',
                fontSize: 16,
                lineHeight: 20
              }
            }
          },
          yAxis: {
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            }
          },
          series: [
            {
              data: data.map(item => total * parseFloat(item.rate) / 100),
              type: 'line',
              symbol: 'circle',
              symbolSize: 15,
              lineStyle: {
                color: '#dd93ff'
              },
              itemStyle: {
                color: '#aaa'
              },
              tooltip: {
                formatter: function({ name, value }) {
                  return `${name.split('\n').join('')}: ${value * 2}件`
                }
              }
            },
            {
              name: '年报上报率3',
              type: 'pictorialBar',
              symbolSize: symbolSize,
              symbolOffset: [0, -7],
              z: 12,
              data: [
                {
                  value: data[0].value,
                  symbolPosition: 'end',
                  itemStyle: {
                    color: '#C5FF87'
                  }
                },
                {
                  value: data[1].value,
                  symbolPosition: 'end',
                  itemStyle: {
                    color: '#FFCD57'
                  }
                },
                {
                  value: data[2].value,
                  symbolPosition: 'end',
                  itemStyle: {
                    color: '#21E3FF'
                  }
                }
              ]
            },
            {
              name: '年报上报率2',
              type: 'pictorialBar',
              symbolSize: symbolSize,
              symbolOffset: [0, 7],
              z: 12,
              itemStyle: {
                normal: {
                  color: '#14b1eb'
                }
              },
              data: data.map((item, index) => {
                if (index === 1) {
                  return {
                    value: item.value,
                    itemStyle: {
                      color: '#FFCD57'
                    }
                  }
                } else if (index === 0) {
                  return {
                    value: item.value,
                    itemStyle: {
                      color: '#C5FF87'
                    }
                  }
                } else {
                  return {
                    value: item.value,
                    itemStyle: {
                      color: '#21E3FF'
                    }
                  }
                }
              })
            },
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  color: '#14b1eb',
                  opacity: 0.7
                }
              },
              label: {
                show: true,
                position: 'top',
                distance: '20',
                fontFamily: 'TRENDS',
                fontSize: 18,
                formatter: '{c}件'
              },
              silent: true,
              barWidth: 50,
              barGap: '-100%', // Make series be overlap
              data: data.map((item, index) => {
                if (index === 1) {
                  return {
                    value: item.value,
                    itemStyle: {
                      color: '#FEB861'
                    },
                    label: {
                      color: '#FEB861'
                    }
                  }
                } else if (index === 0) {
                  return {
                    value: item.value,
                    itemStyle: {
                      color: '#C5FF87'
                    },
                    label: {
                      color: '#C5FF87'
                    }
                  }
                } else {
                  return {
                    value: item.value,
                    itemStyle: {
                      color: '#21E3FF'
                    },
                    label: {
                      color: '#21E3FF'
                    }
                  }
                }
              })
            }
          ]
        }
        this.chart.setOption(option)
      },
      resizeChart() {
        this.initDom()
        this.chart.resize()
      }
    },
    watch: {
      data() {
        this.initChart()
      }
    },
    destroyed() {
      window.removeEventListener('resize', this.resizeChart)
    }
  }
</script>

<style scoped>
  .barchart-wrap {
    width: 100%;
    height: 100%;
  }
</style>
