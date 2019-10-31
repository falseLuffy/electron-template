<template>
    <div class="rateBarChart">
      <div class="text">{{label}}</div>
      <div class="container">
        <div class="rateBar-wrap">
          <div class="item" v-for="(item, index) in data" :style="`width: ${item.rate}; background: ${defaultColors[index]};z-index: ${data.length - index}`"></div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'rateBarChart',
    props: {
      label: {
        type: String,
        default() {
          return '示例标题示例标题示例标题'
        }
      },
      data: {
        type: Array,
        default() {
          return [
            {
              name: '1',
              rate: '60%'
            },
            {
              name: '2',
              rate: '40%'
            }
          ]
        }
      }
    },
    data() {
      return {
        defaultColors: ['linear-gradient(to right, #21e3ff, #21e3ff)', 'linear-gradient(to right, #c5ff87, #c5ff87)']
      }
    }
  }
</script>

<style scoped lang="scss">
.rateBarChart{
  display: flex;
  margin: 8px 0;
  background:  rgba(14, 44, 98, 0.9);
  padding: 8px 16px;
  border-radius: 8px;
  .text{
    flex: 0 0 140px;
    margin-top: 1px;
    font-size: 16px;
    align-items: stretch;
  }
  .container{
    flex: 1 1 2px;
    align-items: stretch;
  }
  .rateBar-wrap{
    font-size: 0;
    vertical-align: middle;
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    .item{
      position: relative;
      height: 15px;
      display: inline-block;
      box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.5);
      border-radius: 11px;
      &:not(:first-child) {
        left: -10px;
      }
    }
  }
}
</style>
