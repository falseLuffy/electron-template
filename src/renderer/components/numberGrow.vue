<template>
  <div class="number-grow-warp">
    <span ref="numberGrow" :data-time="time" class="number-grow" :data-value="value" >0</span>
  </div>
</template>

<script>
  export default {
    name: 'numberGrow',
    props: {
      time: {
        type: Number,
        default: 2000
      },
      value: {
        type: Number,
        default: 0
      }
    },
    // computed: {
    //   value: function() {
    //     // console.log(this.value)
    //     return this.value // 直接监听props里的status状态
    //   }
    // },
    methods: {
      numberGrow (ele) {
        const _this = this
        const step = 1
        let current = 0
        let start = 0
        let once = 0
        // 控制总时长
        const alltime = 2000
        let t = setInterval(function () {
          start += step
          once += 10
          if (_this.value > 0) {
            if (start > _this.value || once === alltime) {
              clearInterval(t)
              start = _this.value
              t = null
            }
            // if(once === alltime) {
            //   clearInterval(t)
            //   start = _this.value
            //   t = null
            // }
            if (current === start) {
              return
            }
            current = start
            ele.innerHTML = current.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
          } else {
            ele.innerHTML = 0
            clearInterval(t)
          }
        }, 10)
      }
    },
    mounted () {
      this.numberGrow(this.$refs.numberGrow)
    },
    watch: {
      value (val) {
        this.value = val
        this.numberGrow(this.$refs.numberGrow)
      }
    }
  }
</script>

<style>
  .number-grow-warp {
    transform: translateZ(0);
  }

  .number-grow {
    /*font-family: Arial-BoldMT;*/
    /*font-size: 64px;*/
    /*color: #ffaf00;*/
    /*letter-spacing: 2.67px;*/
    /*margin:110px 0 20px;*/
    /*display: inline-block;*/
    /*line-height:64px;*/
  }
</style>
