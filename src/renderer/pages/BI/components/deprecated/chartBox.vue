<template>
    <div class="chart-box">
        <div class="header" v-if="!$slots.header">
            <div class="title">{{title}}</div>
            <slot name="feature"></slot>
        </div>
        <slot name="header" v-else></slot>
        <span class="angle tl"></span>
        <span class="angle tr"></span>
        <div class="chart-box-wrap">
            <slot></slot>
        </div>
        <span class="angle br"></span>
        <span class="angle bl"></span>
    </div>
</template>

<script>
  export default {
    name: 'chartBox',
    props: {
      title: String
    }
  }
</script>

<style scoped lang="scss">
    .chart-box {
        position: relative;
        width: 100%;
        height: 100%;
        background: rgba(9, 26, 88, 0.2);
        border: 1px solid transparent;

        .angle {
            position: absolute;
            width: 16px;
            height: 16px;
            border-color: #0084ff;
            border-style: solid;

            &.tl {
                top: -1px;
                left: -1px;
                border-width: 2px 0 0 2px;
            }

            &.tr {
                top: -1px;
                right: -1px;
                border-width: 2px 2px 0 0;
            }

            &.br {
                bottom: -1px;
                right: -1px;
                border-width: 0 2px 2px 0;
            }

            &.bl {
                bottom: -1px;
                left: -1px;
                border-width: 0 0 2px 2px;
            }
        }

        .chart-box-wrap {
            height: calc(100% - 43px)
        }

        .header {
            text-align: left;
        }

        .title {
            position: relative;
            display: inline-block;
            font-family: baidu;
            font-weight: normal;
            font-size: 18px;
            line-height: 25px;
            letter-spacing: 2px;
            color: #95e1ff;
            padding: 4px 8px 4px 24px;
            background-image: linear-gradient(to right, #1d3174, #044b9a);

            &:after {
                position: absolute;
                right: -32px;
                top: 0;
                content: '';
                display: inline-block;
                width: 32px;
                height: 33px;
                background: #044b9a;
                shape-outside: polygon(0 0, 0 100%, 100% 100%, 0 0);
                clip-path: polygon(0 0, 0 100%, 100% 100%, 14px 0);
            }
        }
    }
</style>
