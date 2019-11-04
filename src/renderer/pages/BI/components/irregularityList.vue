<template>
    <div class="irregularity" :style="`height: ${Height + 1}px`">
        <svg :width="`${Width + 1}px`" :height="`${Height +1}px`" :viewBox="`0 0 ${Width + 1} ${Height + 1}`"
             version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <path :d="type === 'left' ? d1: d2" :id="`irregularityList${id}`"></path>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" :id="`gradient${id}`">
                    <stop stop-color="#71D9F9" offset="0%"></stop>
                    <stop stop-color="#2991BE" offset="100%"></stop>
                </linearGradient>
                <filter x="-8.3%" y="-7.9%" width="114.1%" height="115.7%" filterUnits="objectBoundingBox"
                        :id="`filter${id}`">
                    <feGaussianBlur stdDeviation="10" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur>
                    <feOffset dx="0" dy="0" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                    <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1"
                                 result="shadowInnerInner1"></feComposite>
                    <feColorMatrix values="0 0 0 0 0.337347561   0 0 0 0 0.695959469   0 0 0 0 1  0 0 0 0.8 0"
                                   type="matrix"
                                   in="shadowInnerInner1"></feColorMatrix>
                </filter>
            </defs>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g>
                    <path :d="d1" stroke="#47A6FF" fill-opacity="0.7" fill="#0E2C62" stroke-width="2"></path>
                    <foreignObject :width="start + interval - a + 'px'" height="100%">
                        <div v-if="type === 'left'" class="title">{{data.name}}</div>
                        <div class="children" v-else>
                            <div v-for="(item, index) in data.children" class="child" :key="'group'+ index">
                                <span>{{item.name}}</span>
                                <span class="number">{{item.result}} {{item.unit}}</span>
                            </div>
                        </div>
                    </foreignObject>
                </g>
                <g>
                    <path :d="d2" stroke="#47A6FF" fill-opacity="0.7" fill="#0E2C62" stroke-width="2"></path>
                    <foreignObject :x="start + interval + 'px'" y="0" :width="Width - start - interval + a + 'px'"
                                   height="100%">
                        <div class="children" v-if="type === 'left'">
                            <div v-for="(item, index) in data.children" class="child" :key="'child' + index">
                                <span>{{item.name}}</span>
                                <span class="number">{{item.result}} {{item.unit}}</span>
                            </div>
                        </div>
                        <div v-else class="title">{{data.name}}</div>
                    </foreignObject>
                </g>
                <g>
                    <use fill-opacity="0.7" :fill="`url(#gradient${id})`" fill-rule="evenodd"
                         :xlink:href="`#irregularityList${id}`"></use>
                    <use fill="black" fill-opacity="1" :filter="`url(#filter${id})`"
                         :xlink:href="`#irregularityList${id}`"></use>
                </g>
            </g>
        </svg>
    </div>
</template>

<script>
  export default {
    name: 'irregularity',
    props: {
      id: {
        type: String,
        default () {
          return 'id' + Math.random() * 10
        }
      },
      data: {
        type: Object,
        default () {
          return {
            name: '水污染',
            children: [
              {
                name: '督促治理别污染水源',
                value: 0
              },
              {
                name: '督促治理别污染水源',
                value: 0
              },
              {
                name: '督促治理别污染水源',
                value: 0
              },
              {
                name: '督促治理别污染水源',
                value: 0
              },
              {
                name: '督促治理别污染水源',
                value: 0
              }
            ]
          }
        }
      },
      data1: {
        type: Array,
        default () {
          return [
            {
              name: '水污染',
              children: [
                {
                  name: '督促治理别污染水源',
                  value: 0
                },
                {
                  name: '督促治理别污染水源',
                  value: 0
                },
                {
                  name: '督促治理别污染水源',
                  value: 0
                },
                {
                  name: '督促治理别污染水源',
                  value: 0
                }
              ]
            },
            {
              name: '水污染',
              children: [
                {
                  name: '督促治理别污染水源',
                  value: 0
                },
                {
                  name: '督促治理别污染水源',
                  value: 0
                },
                {
                  name: '督促治理别污染水源',
                  value: 0
                },
                {
                  name: '督促治理别污染水源',
                  value: 0
                }
              ]
            },
            {
              name: '水污染',
              children: [
                {
                  name: '督促治理别污染水源',
                  value: 0
                },
                {
                  name: '督促治理别污染水源',
                  value: 0
                },
                {
                  name: '督促治理别污染水源',
                  value: 0
                },
                {
                  name: '督促治理别污染水源',
                  value: 0
                }
              ]
            }
          ]
        }
      },
      type: {
        type: String,
        default () {
          return 'left'
        }
      }
    },
    data () {
      return {
        interval: 60,
        lineHeight: 25,
        padding: 15,
        a: 10
      }
    },
    methods: {
      calculateHeight () {

      }
    },
    computed: {
      start () {
        return this.type === 'left' ? 120 : 542
      },
      count () {
        return this.data.children.length
      },
      Width () {
        return 711
      },
      Height () {
        return this.data.children.length * this.lineHeight + 2 * this.padding
      },
      radius () {
        return 8
      },
      R () {
        return Math.sqrt(Math.pow(this.Height, 2) + Math.pow(25, 2))
      },
      rate () {
        return this.radius / this.R
      },
      x () {
        return this.interval * this.rate
      },
      y () {
        return this.Height * this.rate
      },
      d1 () {
        return `M${0.5},${this.Height - this.radius} ` +
          `C${0.5},${this.Height - this.radius} ${0},${this.Height} ${this.radius},${this.Height} ` +
          `L${this.start - this.a - this.y},${this.Height} ` +
          `C${this.start - this.a - this.y},${this.Height} ${this.start - this.a},${this.Height} ${this.start - this.a + this.x},${this.Height - this.y} ` +
          `L${this.start + this.interval - this.a - this.x},${this.y} ` +
          `C${this.start + this.interval - this.a - this.x},${this.y} ${this.start + this.interval - this.a},0 ${this.start + this.interval - this.a - this.y},0 ` +
          `L${this.radius},0 ` +
          `C${this.radius},0 0,0 0,${this.radius} ` +
          `L${0.5},${this.Height - this.radius} Z`
      },
      d2 () {
        return `M${this.start + this.x},${this.Height - this.y} ` +
          `C${this.start + this.x},${this.Height - this.y} ${this.start},${this.Height} ${this.start + this.radius},${this.Height} ` +
          `L${this.Width - this.radius},${this.Height} ` +
          `C${this.Width - this.radius},${this.Height} ${this.Width},${this.Height} ${this.Width},${this.Height - this.radius} ` +
          `L${this.Width},${this.radius - 0.5} ` +
          `C${this.Width},${this.radius - 0.5} ${this.Width} 0.5 ${this.Width - this.radius},0.5 ` +
          `L${this.start + this.interval + this.y},${0.5} ` +
          `C${this.start + this.interval + this.y},${0.5} ${this.start + this.interval},0.5 ${this.start + this.interval - this.x},${this.y} ` +
          `L${this.start + this.x},${this.Height - this.y} Z`
      }
    }
  }
</script>

<style scoped lang="scss">
    .irregularity {
        width: 100%;
        color: #fff;
        margin: 10px 0;

        .title {
            position: absolute;
            top: 50%;
            left: 35%;
            transform: translate(-50%, -50%);
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
        }

        .children {
            padding: 15px 20px;
            text-align: left;

            .number {
                float: right;
            }
        }

        .child {
            line-height: 25px;
            font-size: 15px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #58f4ff;
        }
    }
</style>

