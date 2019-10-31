<template>
    <div class="classifyTable">
      <div class="classify-wrap">
        <div class="classify" v-for="(item, index) in data"
             :style="`line-height: ${(index+1) === data.length ?
              item.children.length * 33 : item.children.length * 33 - 4}px`">{{item.name}}</div>
      </div>
      <div class="detail-wrap">
        <div class="detail" v-for="item in children">
          <span class="name">{{item.series}}</span>
          <span class="value">{{item.value}}</span>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'classifyTable',
    props: {
      data: {
        type: Array,
        default() {
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
      }
    },
    computed: {
      children() {
        let children = []
        this.data.forEach((item) => {
          children = [...children, ...item.children]
        })
        return children
      }
    }
  }
</script>

<style scoped lang="scss">
  .classifyTable{
    width: 100%;
    height: 100%;
    color: #fff;
    .classify-wrap{
      float: left;
      width: 102px;
      text-align: center;
      .classify{
        border-radius: 8px;
        background: linear-gradient(to left,rgba(62, 222, 255, .3), rgba(97, 146, 255, 0.3));
        margin-bottom: 2px;
        border: solid 1px #47a6ff;
        &:last-child{
          margin-bottom: 0;
        }
      }
    }
    .detail-wrap{
      margin-left: 110px;
      .detail{
        line-height: 33px;
        padding-left: 39px;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0;
        color: #95e1ff;
        &:nth-child(2n + 1){
          background: linear-gradient(to left,rgba(62, 222, 255, 0.21), rgba(97, 146, 255, 0.21));
        }
        &:nth-child(2n){
          background: linear-gradient(to left,rgba(62, 222, 255, 0.06), rgba(97, 146, 255, 0.06));
        }
        .value{
          float: right;
          margin-right: 36px;
        }
      }
    }
  }
</style>
