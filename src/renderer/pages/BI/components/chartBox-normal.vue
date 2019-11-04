<template>
    <div class="chart-box-normal">
        <svg width="524px" height="309px" viewBox="0 0 524 309" version="1.1" xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
                    <stop stop-color="#0B255B" offset="0%"></stop>
                    <stop stop-color="#0D6CB2" offset="100%"></stop>
                </linearGradient>
                <polygon id="path-2-b" points="0 0 524 0 524 309 484 309 468 301 56 301 40 309 0 309"></polygon>
                <filter x="-1.9%" y="-3.2%" width="103.8%" height="106.5%" filterUnits="objectBoundingBox"
                        id="filter-3">
                    <feGaussianBlur stdDeviation="10" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur>
                    <feOffset dx="0" dy="0" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                    <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1"
                                 result="shadowInnerInner1"></feComposite>
                    <feColorMatrix values="0 0 0 0 0.337347561   0 0 0 0 0.695959469   0 0 0 0 1  0 0 0 0.8 0"
                                   type="matrix"
                                   in="shadowInnerInner1"></feColorMatrix>
                </filter>
            </defs>
            <g id="页面1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="公益诉讼态势分析备份-19" transform="translate(-1364.000000, -84.000000)">
                    <g id="编组-20备份" transform="translate(1364.000000, 84.000000)">
                        <g id="编组-21">
                            <g id="矩形">
                                <use fill-opacity="0.8" fill="url(#linearGradient-1)" fill-rule="evenodd"
                                     xlink:href="#path-2-b"></use>
                                <use fill="black" fill-opacity="1" filter="url(#filter-3)" xlink:href="#path-2-b"></use>
                                <path stroke-opacity="0.7" stroke="#51A3FF" stroke-width="2"
                                      d="M1,1 L1,308 L39.763932,308 L55.763932,300 L468.236068,300 L484.236068,308 L523,308 L523,1 L1,1 Z"
                                      stroke-linejoin="square"></path>
                                <foreignObject class="node" x="24" y="8" width="250" height="23">
                                    <div class="title" style="">{{title}}</div>
                                </foreignObject>
                                <foreignObject class="node" x="317" y="8" width="183" height="23">
                                    <slot name="legend"></slot>
                                </foreignObject>
                                <foreignObject class="node" x="24" y="8" width="250" height="23">
                                    <slot name="label"></slot>
                                </foreignObject>
                                <foreignObject class="node" x="2" y="34" width="520" height="246">
                                    <slot></slot>
                                </foreignObject>
                            </g>
                            <g id="编组-20" transform="translate(52.000000, 304.000000)">
                                <polygon id="矩形" fill="#68CEFE" points="10 0 410 0 420.5 5 0 5"></polygon>
                                <rect id="矩形" fill="#9BFFFF" x="110" y="0" width="200" height="5" rx="2.5"></rect>
                                <rect id="矩形备份-6" fill="#9BFFFF" x="97" y="0" width="5" height="5" rx="2.5"></rect>
                                <rect id="矩形备份-6" fill="#9BFFFF" x="318" y="0" width="5" height="5" rx="2.5"></rect>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    </div>
</template>

<script>
  export default {
    name: 'chartBox-normal',
    props: {
      title: {
        type: String,
        default () {
          return '示例标题'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    .chart-box-normal {
        position: relative;
        z-index: 10;
        width: 100%;
        height: 100%;
        background: rgba(9, 26, 88, 0.2);
        border: 1px solid transparent;

        .title {
            font-family: PingFang SC, Microsoft YaHei, Helvetica Neue, Helvetica, Hiragino Sans GB, Arial, sans-serif;
            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 2px;
            color: #49f0ff;
        }
    }
</style>
