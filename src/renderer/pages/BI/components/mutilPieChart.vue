<template>
    <div class="multi-pieChart" ref="multiPieChart">
      <div class="tooltip-wrap">
        <div class="tip tr" v-if="data[0].value">
          <div>判决驳回</div>
          <div>{{data[0].value || 0}} 件 {{data[0].rate || '0%'}}</div>
        </div>
        <div class="tip br" v-if="data[1].value">
          <div>判决驳回起诉</div>
          <div>{{data[1].value || 0}} 件 {{data[1].rate || '0%'}}</div>
        </div>
        <div class="tip bl" v-if="data[2].value">
          <div>裁定不予受理</div>
          <div>{{data[2].value || 0}} 件 {{data[2].rate || '0%'}}</div>
        </div>
        <div class="tip lt" v-if="data[3].value">
          <div>判决支持</div>
          <div>{{data[3].value || 0}} 件 {{data[3].rate || '0%'}}</div>
        </div>
      </div>
      <div class="pie" ref="pie"></div>
    </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'pieChart',
    props: {
      title: String,
      gradual: {
        type: Array,
        default() {
          return ['red', 'blue']
        }
      },
      data: {
        type: Array,
        default() {
          return [
            {}, {}, {}, {}
          ]
        }
      }
    },
    created() {

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
        this.$refs.pie.style.width = this.$refs.multiPieChart.clientWidth + 'px'
        this.$refs.pie.style.height = this.$refs.multiPieChart.clientHeight + 'px'
      },
      initChart() {
        this.chart = echarts.init(this.$refs.pie)
        const options = {
          title: {
            show: false
          },
          series: [
            {
              type: 'pie',
              radius: ['70%', '80%'],
              avoidLabelOverlap: false,
              hoverOffset: 0,
              label: {
                show: false
              },
              data: [
                {
                  value: this.data[0].value,
                  name: this.data[0].value + '件',
                  itemStyle: {
                    color: '#1054E3'
                  }
                },
                {
                  value: this.data[0].other,
                  name: '',
                  itemStyle: {
                    color: '#02113d'
                  }
                }
              ]
            },
            {
              type: 'pie',
              radius: ['55%', '65%'],
              avoidLabelOverlap: false,
              hoverOffset: 0,
              label: {
                show: false
              },
              data: [
                {
                  value: this.data[1].value,
                  name: this.data[1].value + '件',
                  itemStyle: {
                    color: '#25E3CE'
                  }
                },
                {
                  value: this.data[1].other,
                  name: '',
                  itemStyle: {
                    color: '#02113d'
                  }
                }
              ]
            },
            {
              type: 'pie',
              radius: ['40%', '50%'],
              avoidLabelOverlap: false,
              hoverOffset: 0,
              label: {
                show: false
              },
              data: [
                {
                  value: this.data[2].value,
                  name: this.data[2].value + '件',
                  itemStyle: {
                    color: '#9477E0'
                  }
                },
                {
                  value: this.data[2].other,
                  name: '',
                  itemStyle: {
                    color: '#02113d'
                  }
                }
              ]
            },
            {
              type: 'pie',
              radius: ['25%', '35%'],
              avoidLabelOverlap: false,
              hoverOffset: 0,
              label: {
                show: false
              },
              data: [
                {
                  value: this.data[3].value,
                  name: this.data[3].value + '件',
                  itemStyle: {
                    color: '#F1ED98'
                  }
                },
                {
                  value: this.data[3].other,
                  name: '',
                  itemStyle: {
                    color: '#02113d'
                  }
                }
              ]
            }
          ]
        }

        this.chart.setOption(options)
      },
      resizeChart() {
        this.initDom()
        this.chart.resize()
      }
    },
    watch: {
      data() {
        this.chart.dispose()
        this.initChart()
      }
    },
    destroyed() {
      window.removeEventListener('resize', this.resizeChart)
    }
  }
</script>

<style scoped lang="scss">
  .multi-pieChart{
    width: 100%;
    height: 100%;
    position: relative;
    .tip{
      position: absolute;
      padding: 2px 3px;
      width: 130px;
      height: 54px;
      line-height: 25px;
      border-style: solid;
      border-width: 1px;
      text-align: right;
      z-index: 10;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0;
      box-sizing: border-box;
      border-radius: 2px;
      &.tr{
        top: 30px;
        right: 79px;
        border-color: #25e3ce;
        background: rgba(37, 227, 206, 0.5)
      }
      &.br{
        bottom: 30px;
        right: 79px;
        border-color: #f1ed98;
        background: rgba(241, 237, 152, 0.5)
      }
      &.bl{
        bottom: 30px;
        left: 79px;
        border-color: #9477e0;
        background: rgba(148, 119, 224, 0.5)
      }
      &.lt{
        top: 30px;
        left: 79px;
        border-color: #1054e3;
        background: rgba(16, 84, 227, 0.5)
      }
    }
  }
</style>
