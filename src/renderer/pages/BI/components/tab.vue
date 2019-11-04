<template>
    <div class="tabs">
        <ul class="tab-wrap">
            <li class="tab-item"
                :style="`left: ${10 * (data.length-index)}px`"
                :class="item.value === currentTab ? 'active' : ''"
                @click="toggleTab(item)"
                v-for="(item, index) in data">
                <div class="tab-item-wrap">
                    {{item.name}}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'tab',
    props: {
      data: {
        type: Array,
        default () {
          return [
            {
              name: '线索',
              value: 'clue'
            },
            {
              name: '立案',
              value: 'file'
            },
            {
              name: '诉前',
              value: 'preSuit'
            },
            {
              name: '起诉',
              value: 'suit'
            }
          ]
        }
      },
      value: String
    },
    data () {
      return {
        currentTab: ''
      }
    },
    created () {
      this.currentTab = this.data[0].value
      this.toggleTab(this.data[0])
    },
    methods: {
      toggleTab (item) {
        this.currentTab = item.value
        this.$emit('change', item)
        this.$emit('input', item.value)
      }
    },
    watch: {
      value () {
        this.currentTab = this.value
      }
    }
  }
</script>

<style scoped lang="scss">
    .tabs {
        display: inline-block;
        margin: 0;
        height: 25px;
        color: #0084ff;

        .tab-wrap {
            padding: 0;
        }

        .tab-item {
            position: relative;
            display: inline-block;
            padding: 1px 2px;
            line-height: 23px;
            list-style: none;
            margin: 0;
            font-size: 16px;
            letter-spacing: 0;
            background: #0084ff;
            cursor: pointer;
            color: #0084ff;
            shape-outside: polygon(0 0, 10% 100%, 100% 100%, 90% 0);
            clip-path: polygon(0 0, 10% 100%, 100% 100%, 90% 0);

            .tab-item-wrap {
                padding: 0 20px;
                background: rgb(9, 26, 88);
                shape-outside: polygon(0 0, 10% 100%, 100% 100%, 90% 0);
                clip-path: polygon(0 0, 10% 100%, 100% 100%, 90% 0);
            }

            &:not(:last-child) {
                padding-right: 0;
                border-right: 1px solid transparent;
            }

            &.active {
                color: #fff;

                .tab-item-wrap {
                    background: linear-gradient(to right, #7c71ff, #1c60bc);
                }
            }
        }
    }
</style>
