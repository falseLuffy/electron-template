<template>
    <div class="c-progress">
        <div class="text">
            <span class="circle">{{index}}</span>
            <span>{{label}}</span>
        </div>
        <div class="progress-wrap" :style="`border-radius:${(stroke + 6)/2}px`">
            <div class="progress-inner"
                 :style="`background: ${color}; width: ${percentage}%; height: ${stroke}px;border-radius:${stroke/2}px`"></div>
        </div>
        <div class="value">{{data}}件</div>
    </div>
</template>

<script>
  export default {
    name: 'CProgress',
    props: {
      color: {
        type: String,
        default () {
          return 'red'
        }
      },
      label: String,
      percentage: {
        type: Number || String,
        default () {
          return 0
        }
      },
      index: {
        type: String | Number,
        default: 0
      },
      stroke: {
        type: Number || String,
        default () {
          return 11
        }
      },
      data: String | Number
    }
  }
</script>

<style scoped lang="scss">
    .c-progress {
        padding: 16px 0 16px 10px;
        display: flex;
        color: #95e1ff;
        font-size: 16px;
        height: 20px;
        align-items: center;
        background-color: rgba(14, 44, 98, 0.9);
        border-radius: 8px;


        .text {
            flex: 0 0 100px;
            line-height: 20px;
            font-size: 16px;

            .circle {
                display: inline-block;
                width: 19px;
                height: 19px;
                border-radius: 50%;
                background: rgba(33, 227, 255, 0.8);
                color: rgba(9, 26, 88, 1);
                text-align: center;
                vertical-align: top;
                margin: 1px 12px 0 0;
            }
        }

        .progress-wrap {
            flex: 1 1 2px;
            overflow: hidden;

            .progress-inner {
                vertical-align: top;
            }
        }

        .value {
            flex: 0 0 80px;
            line-height: 20px;
            padding-left: 25px;
            font-family: TRENDS;
            font-size: 18px;
        }
    }
</style>
