<template>
  <div class="chart-box" ref="chartBox">
    <svg width="524px" :height="height" :viewBox="`0 0 524 ${height}`" version="1.1" xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
          <stop stop-color="#0B255B" offset="0%"></stop>
          <stop stop-color="#0D6CB2" offset="100%"></stop>
        </linearGradient>
        <polygon :id=" `path-${height}`" :points="`0 0 238 0 270 32 524 32 524 ${height} 484 ${height} 468 ${height - 8} 56 ${height - 8} 40 ${height} 0 ${height}`"></polygon>
        <polygon id="path-3" points="0.5 0.5 0.5 24.5 64.5 24.5 64.5 0.5 0.5 0.5"></polygon>
        <filter x="-1.9%" y="-3.2%" width="103.8%" height="106.5%" filterUnits="objectBoundingBox" id="filter-3">
          <feGaussianBlur stdDeviation="10" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur>
          <feOffset dx="0" dy="0" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
          <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1"
                       result="shadowInnerInner1"></feComposite>
          <feColorMatrix values="0 0 0 0 0.337347561   0 0 0 0 0.695959469   0 0 0 0 1  0 0 0 0.8 0" type="matrix"
                         in="shadowInnerInner1"></feColorMatrix>
        </filter>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-4">
          <stop stop-color="#0B255B" offset="0%"></stop>
          <stop stop-color="#0D6CB2" offset="100%"></stop>
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-5">
          <stop stop-color="#71D9F9" offset="0%"></stop>
          <stop stop-color="#2991BE" offset="100%"></stop>
        </linearGradient>
        <polygon id="path-6" points="-1.39670222e-12 0 78.5 0 78.6043165 25 23.5 25"></polygon>
        <filter x="-12.7%" y="-40.0%" width="125.4%" height="180.0%" filterUnits="objectBoundingBox" id="filter-7">
          <feGaussianBlur stdDeviation="10" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur>
          <feOffset dx="0" dy="0" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
          <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1"
                       result="shadowInnerInner1"></feComposite>
          <feColorMatrix values="0 0 0 0 0.337347561   0 0 0 0 0.695959469   0 0 0 0 1  0 0 0 0.8 0" type="matrix"
                         in="shadowInnerInner1"></feColorMatrix>
        </filter>
      </defs>
      <g id="页面1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g>
          <g>
            <g id="主体">
              <use fill-opacity="0.8" fill="url(#linearGradient-1)" fill-rule="evenodd"
                   :xlink:href="`#path-${height}`"></use>
              <use fill="black" fill-opacity="1" filter="url(#filter-3)" :xlink:href="`# path-${height}`"></use>
              <path stroke-opacity="0.7" stroke="#51A3FF" stroke-width="2"
                    :d="`M1,1 L1,${height - 1} L39.763932,${height - 1} L55.763932,${height - 1 - 8} L468.236068,${height - 1 - 8} L484.236068,${height - 1} L523,${height - 1} L523,33 L269.585786,33 L237.585786,1 L1,1 Z`"
                    stroke-linejoin="square"></path>
              <foreignObject class="node"  x="24" y="8" width="100" height="23">
                <div class="title" style="">{{title}}</div>
              </foreignObject>
              <foreignObject class="node" x="2" y="34" width="520" height="246">
                <slot></slot>
              </foreignObject>
            </g>
            <g :transform="`translate(52.000000, ${height - 5})`">
              <polygon id="矩形" fill="#68CEFE" points="10 0 410 0 420.5 5 0 5"></polygon>
              <rect id="矩形" fill="#9BFFFF" x="110" y="0" width="200" height="5" rx="2.5"></rect>
              <rect id="矩形备份-6" fill="#9BFFFF" x="97" y="0" width="5" height="5" rx="2.5"></rect>
              <rect id="矩形备份-6" fill="#9BFFFF" x="318" y="0" width="5" height="5" rx="2.5"></rect>
            </g>
          </g>
          <g id="tab-wrap" transform="translate(253, 0)">
            <g id="tab1" transform="translate(0, 0)" @click="toggle('clue')" style="cursor: pointer;">
              <template v-if="currentTab === 'clue'" >
                <g id="矩形" >
                  <use fill-opacity="0.8" fill="url(#linearGradient-5)" fill-rule="evenodd"
                       xlink:href="#path-6"></use>
                  <use fill="black" fill-opacity="1" filter="url(#filter-7)" xlink:href="#path-6"></use>
                  <path stroke-opacity="0.7" stroke="#51A3FF" stroke-width="1"
                        d="M1.15622154,0.5 L23.7162215,24.5 L78.1022259,24.5 L78.002082,0.5 L1.15622154,0.5 Z"
                        stroke-linejoin="square"></path>
                </g>
                <text id="线索" font-family="PingFangSC-Semibold, PingFang SC" font-size="16" font-weight="500"
                      fill="#FFFFFF">
                  <tspan x="32" y="18">线索</tspan>
                </text>
              </template>
              <template v-else>
                <path stroke-opacity="0.7" stroke="#51A3FF" stroke-width="1"
                      d="M1.15622154,0.5 L23.7162215,24.5 L78.1022259,24.5 L78.002082,0.5 L1.15622154,0.5 Z"
                      stroke-linejoin="square"></path>
                <text id="线索" font-family="PingFangSC-Semibold, PingFang SC" font-size="16" font-weight="500"
                      fill="#95E1FF">
                  <tspan x="32" y="18">线索</tspan>
                </text>
              </template>
            </g>
            <g id="tab2" transform="translate(78, 0)"  @click="toggle('filing')" style="cursor: pointer;">
              <template v-if="currentTab === 'filing'">
                <g>
                  <use fill-opacity="0.8" fill="url(#linearGradient-5)" fill-rule="evenodd"
                       xlink:href="#path-3"></use>
                  <use fill="black" fill-opacity="1" filter="url(#filter-7)" xlink:href="#path-3"></use>
                  <path d="M0.5,0.5 L0.5,24.5 L64.5,24.5 L64.5,0.5 L0.5,0.5 Z" id="矩形备份-12" stroke-opacity="0.7"
                        stroke="#51A3FF" fill-opacity="0.8"></path>
                </g>
                <text id="立案" font-family="PingFangSC-Regular, PingFang SC" font-size="16" font-weight="normal"
                      fill="#FFFFFF">
                  <tspan x="15" y="18">立案</tspan>
                </text>
              </template>
              <template v-else>
                <path d="M0.5,0.5 L0.5,24.5 L64.5,24.5 L64.5,0.5 L0.5,0.5 Z" id="矩形备份-12" stroke-opacity="0.7"
                      stroke="#51A3FF" fill-opacity="0.8" fill="url(#linearGradient-7)"></path>
                <text id="立案" font-family="PingFangSC-Regular, PingFang SC" font-size="16" font-weight="normal"
                      fill="#95E1FF">
                  <tspan x="15" y="18">立案</tspan>
                </text>
              </template>
            </g>
            <g id="tab3" transform="translate(142, 0)"  @click="toggle('beforeSuit')" style="cursor: pointer;">
              <template v-if="currentTab === 'beforeSuit'">
                <g>
                  <use fill-opacity="0.8" fill="url(#linearGradient-5)" fill-rule="evenodd"
                       xlink:href="#path-3"></use>
                  <use fill="black" fill-opacity="1" filter="url(#filter-7)" xlink:href="#path-3"></use>
                  <path d="M0.5,0.5 L0.5,24.5 L64.5,24.5 L64.5,0.5 L0.5,0.5 Z" id="矩形备份-7" stroke-opacity="0.7"
                        stroke="#51A3FF" fill-opacity="0.8" fill="url(#linearGradient-7)"></path>
                </g>
                <text id="诉前" fill="#fff">
                  <tspan x="14.5" y="17">诉前</tspan>
                </text>
              </template>
              <template v-else>
                <path d="M0.5,0.5 L0.5,24.5 L64.5,24.5 L64.5,0.5 L0.5,0.5 Z" id="矩形备份-7" stroke-opacity="0.7"
                      stroke="#51A3FF" fill-opacity="0.8" fill="url(#linearGradient-7)"></path>
                <text id="诉前" fill="#95E1FF">
                  <tspan x="14.5" y="17">诉前</tspan>
                </text>
              </template>
            </g>
            <g id="tab4" transform="translate(206.5, 0)" @click="toggle('suit')" style="cursor: pointer;">
              <template v-if="currentTab === 'suit'">
                <g>
                  <use fill-opacity="0.8" fill="url(#linearGradient-5)" fill-rule="evenodd"
                       xlink:href="#path-3"></use>
                  <use fill="black" fill-opacity="1" filter="url(#filter-7)" xlink:href="#path-3"></use>
                  <path d="M0.5,0.5 L0.5,24.5 L64.5,24.5 L64.5,0.5 L128.5,0.5 Z" id="矩形备份-4"
                        stroke-opacity="0.7" stroke="#51A3FF" fill-opacity="0.8"></path>
                </g>
                <text id="起诉" fill="#ffffff">
                  <tspan x="14.5" y="17">起诉</tspan>
                </text>
              </template>
              <template v-else>
                <path d="M0.5,0.5 L0.5,24.5 L64.5,24.5 L64.5,0.5 L128.5,0.5 Z" id="矩形备份-4"
                      stroke-opacity="0.7" stroke="#51A3FF" fill-opacity="0.8"></path>
                <text id="起诉" fill="#95E1FF">
                  <tspan x="14.5" y="17">起诉</tspan>
                </text>
              </template>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'chartBox-especial',
    props: {
      value: {
        type: String,
        default() {
          return 'clue'
        }
      },
      title: {
        type: String,
        default() {
          return '示例标题'
        }
      },
      auto: {
        type: Number
      }
    },
    data() {
      return {
        currentTab: 'clue',
        tabList: ['clue', 'filing', 'beforeSuit', 'suit'],
        height: 0,
        interval: 0
      }
    },
    mounted() {
      this.height = this.$refs.chartBox.clientHeight
      this.toggle('clue')
      if (typeof this.auto === 'number') {
        this.interval = this.auto
        this.autoToggle()
      } else if (this.auto !== undefined) {
        this.interval = 3000
        this.autoToggle()
      }
      this.$refs.chartBox.addEventListener('mouseenter', () => {
        clearTimeout(this.timer)
      })
      this.$refs.chartBox.addEventListener('mouseleave', () => {
        clearTimeout(this.timer)
        this.autoToggle()
      })
    },
    methods: {
      toggle(name) {
        this.currentTab = name
        this.$emit('input', name)
      },
      autoToggle() {
        if (this.auto === undefined) return
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          const index = this.tabList.indexOf(this.currentTab)
          if (this.tabList.length > (index + 1)) {
            this.toggle(this.tabList[index + 1])
          } else {
            this.toggle(this.tabList[0])
          }
          this.autoToggle()
        }, this.interval)
      }
    },
    watch: {
      value(value) {
        this.currentTab = value
      }
    }
  }
</script>

<style scoped lang="scss">
  .chart-box {
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: rgba(9, 26, 88, 0.2);
    border: 1px solid transparent;
    .title{
      font-family: PingFang SC, Microsoft YaHei, Helvetica Neue, Helvetica, Hiragino Sans GB, Arial, sans-serif;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 2px;
      color: #49f0ff;
    }
    svg {
      width: 100%;
      height: 100%;
    }
  }
</style>
