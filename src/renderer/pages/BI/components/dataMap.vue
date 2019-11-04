<template>
    <div class="map-container" ref="chartContainer">
        <div class="dataMap" ref="dataMap"></div>
    </div>
</template>

<script>
  import echarts from 'echarts'
  // import 'echarts-gl'

  export default {
    name: 'dataMap',
    props: {
      mapJson: {},
      activeRegions: Array
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
        this.$refs.dataMap.style.width = this.$refs.chartContainer.clientWidth + 'px'
        this.$refs.dataMap.style.height = this.$refs.chartContainer.clientHeight + 'px'
      },
      resizeChart () {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.initDom()
          this.chart.resize()
        }, 50)
      },
      initChart () {
        echarts.registerMap('anhui', this.mapJson)
        this.chart = echarts.init(this.$refs.dataMap)
        const options = {
          title: {
            show: false
          },
          geo: {
            type: 'map',
            map: 'anhui',
            itemStyle: {
              borderType: 'dashed',
              borderColor: '#8af0ff',
              borderWidth: 1,
              areaColor: {
                type: 'linear-gradient',
                x: 0,
                y: 34.5,
                x2: 0,
                y2: 29.5,
                colorStops: [{
                  offset: 0,
                  color: '#2C7EFF' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#61D4F2' // 50% 处的颜色
                }],
                global: true // 缺省为 false
              },
              emphasis: {
                areaColor: {
                  type: 'linear-gradient',
                  x: 0,
                  y: 34.5,
                  x2: 0,
                  y2: 29.5,
                  colorStops: [{
                    offset: 0,
                    color: '#2C7EFF' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#61D4F2' // 50% 处的颜色
                  }],
                  global: true // 缺省为 false
                }
              }
            },
            zoom: 1,
            left: 195,
            top: 75,
            layoutSize: '100%',
            z: 1,
            silent: true
          },
          tooltip: {
            show: true,
            formatter: '{b}',
            fontSize: 16
          },
          series: [
            {
              name: 'anhui',
              type: 'map',
              map: 'anhui',
              zoom: 1,
              z: 2,
              geoIndex: 2,
              selectedMode: 'single',
              itemStyle: {
                borderType: 'dashed',
                borderColor: '#8af0ff',
                borderWidth: 1,
                areaColor: {
                  type: 'linear-gradient',
                  x: 0,
                  y: 34.5,
                  x2: 0,
                  y2: 29.5,
                  colorStops: [{
                    offset: 0,
                    color: '#61D4F2' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#0347A8' // 50% 处的颜色
                  }],
                  global: true // 缺省为 false
                },
                emphasis: {
                  areaColor: '#52fffc'
                }
              },
              layoutSize: '100%',
              emphasis: {
                label: {
                  show: false
                }
              },
              silent: false
            }
          ]
        }
        this.chart.setOption(options)
        this.activeRegions.forEach((region) => {
          this.setActiveRegion(region)
        })
        this.chart.on('mapselectchanged', (event) => {
          const city = event.batch[0].name
          if (event.batch[0].selected[city]) {
            this.$emit('change', city)
          } else {
            this.$emit('change', '安徽省')
          }
        })
      },
      setActiveRegion (region) {
        this.chart.dispatchAction({
          type: 'mapSelect',
          name: region
        })
      },
      clearRegionSelect (region) {
        this.chart.dispatchAction({
          type: 'geoUnSelect',
          name: region
        })
      }
    },
    watch: {
      activeRegions (Regions, old) {
        if (Regions !== old) {
          old.forEach((region) => {
            this.clearRegionSelect(region)
          })
          Regions.forEach((region) => {
            this.setActiveRegion(region)
          })
        }
      }
    },
    destroyed () {
      window.removeEventListener('resize', this.resizeChart)
    }
  }
</script>

<style scoped lang="scss">
    .map-container {
        width: 100%;
        height: 100%;
    }
</style>
