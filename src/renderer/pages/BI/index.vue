<template>
  <div class="data-visual" ref="dataContainer">
    <div class="header">
      <h3 class="text">公益诉讼决策支持系统</h3>
      <svg class="pathWrap" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%"
           style="width: 960px;margin: 0 auto;">
        <path d="M4 8 L168 8 L218 59 L734 59 L782 8 L946 8" style="fill:transparent;stroke:#34cbeb;stroke-width:1;"/>
        <circle cx="8" cy="8" r="6" fill="#34cbeb"/>
        <circle cx="946" cy="8" r="6" fill="#34cbeb"/>
        <path d="M328 57 L630 57  " style="fill:transparent;stroke:#34cbeb;stroke-width:3;"/>
      </svg>
    </div>
    <div class="layout">
      <div class="layout-side-l">
        <div style="height: 309px;margin: 0 0 24px 0;" v-loading="suitType.loading" element-loading-background="rgba(7,17,27,0.6)">
          <chart-box title="诉讼类型分布">
            <div slot="feature" style="float: right;margin-right: 24px;padding-top: 8px;">
              <tabs v-model="suitType.currentTab"></tabs>
            </div>
            <div class="lawsuit-type-wrap">
              <div class="pieChart-wrap" v-for="item in suitType.pool[suitType.currentTab]">
                <pieChart :gradual="suitType.gradual[item.type]" :data="item"></pieChart>
                <p class="chart-desc">{{item.name}}</p>
              </div>
            </div>
          </chart-box>
        </div>
        <div style="height: 309px;margin: 24px 0;" v-loading="regionTop.loading" element-loading-background="rgba(7,17,27,0.6)">
          <chart-box title="区域分布">
            <div slot="feature" style="float: right;margin-right: 24px;padding-top: 8px;">
              <tabs v-model="regionTop.currentTab"></tabs>
            </div>
            <div class="progress-wrap" >
              <c-progress :color="index<2 ? 'linear-gradient(to right, #93c55d, #ffd07f)': 'linear-gradient(to right, #0069ff, #3df6ff)'"
                          :index="index+1" :percentage="parseInt(item.rate)" :data="item.value"
                          v-for="(item, index) in regionTop.pool[regionTop.currentTab]"
                          :label="item.name" :key="'progress'+ index"></c-progress>
             <!-- <c-progress color="linear-gradient(to right, #93c55d, #ffd07f)" index="2" :percentage="50"
                          label="瑶海区"></c-progress>
              <c-progress color="linear-gradient(to right, #0069ff, #3df6ff)" index="3" :percentage="40"
                          label="高新区"></c-progress>
              <c-progress color="linear-gradient(to right, #0069ff, #3df6ff)" index="4" :percentage="70"
                          label="政务区"></c-progress>
              <c-progress color="linear-gradient(to right, #0069ff, #3df6ff)" index="5" :percentage="50"
                          label="庐阳区"></c-progress>
              <c-progress color="linear-gradient(to right, #0069ff, #3df6ff)" index="6" :percentage="70"
                          label="包河区"></c-progress>-->
            </div>
          </chart-box>
        </div>
        <div style="height: 296px;margin: 24px 0 0;" v-loading="suitFieldDistribute.loading" element-loading-background="rgba(7,17,27,0.6)">
          <chart-box title="领域分布">
            <div slot="feature" style="float: right;margin-right: 24px;padding-top: 8px;">
              <tabs v-model="suitFieldDistribute.currentTab"></tabs>
            </div>
            <div class="radar-wrap" style="width: 100%; height: 100%">
              <radar-chart :data="suitFieldDistribute.pool[suitFieldDistribute.currentTab] || []"></radar-chart>
            </div>
          </chart-box>
        </div>
      </div>
      <div class="layout-middle">
        <div class="overview-wrap">
          <div class="overview">
            <select class="c-select" v-model="currentArea" @change="handleAreaChange">
              <option v-for="item in areaCode" :label="item.name" :value="item.code"></option>
            </select>
            <div class="overview-item">
              <div class="title">线索数量/条</div>
              <div class="number">{{noticeAndsuggestion.pool.clue | overflow}}</div>
            </div>
            <div class="overview-item">
              <div class="title">立案数量/件</div>
              <div class="number">{{noticeAndsuggestion.pool.filing | overflow}}</div>
            </div>
            <div class="overview-item">
              <div class="title">提起诉讼/条</div>
              <div class="number">{{noticeAndsuggestion.pool.suit | overflow}}</div>
            </div>
          </div>
          <div class="dataMap-wrap">
            <dataMap :mapJson="mapJson" :active-regions="activeRegions" @change="handleMapChange"></dataMap>
          </div>
        </div>
        <div class="notice-wrap" v-loading="noticeAndsuggestion.loading" element-loading-background="rgba(7,17,27,0.6)">
          <div class="notice">
            <img class="img" src="./asserts/notice.png" alt="">
            <span class="label-wps">已发出 诉前公告</span>
            <span class="number">{{noticeAndsuggestion.pool.announcement | overflow}}<span class="unit">件</span></span>
          </div>
          <div class="notice">
            <img class="img" src="./asserts/suggest.png" alt="">
            <span class="label-wps">已发出 检查建议</span>
            <span class="number">{{noticeAndsuggestion.pool.suggestion | overflow}}<span class="unit">件</span></span>
          </div>
        </div>
        <div class="region-wrap" v-loading="suitFieldDeal.loading" element-loading-background="rgba(7,17,27,0.6)">
          <chart-box>
            <div class="region-header" slot="header">
              <div class="text">
                <span>办案成效</span>
                <svg class="pathWrap" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%"
                     style="width: 224px;position: absolute;left:-32px;top: 1px;z-index: 10">
                  <path d="M0 0 L16 30 L208 30 L224 0" style="fill:transparent;stroke:#34cbeb;stroke-width:1;"/>
                </svg>
              </div>
              <select class="region-select" v-model="suitFieldDeal.currentTab">
                <option label="资源保护领域（不涉及污染）" value="environmentPollution"></option>
                <option label="生态环境领域" value="2"></option>
                <option label="城镇国有土地使用权出让领域" value="3"></option>
                <option label="国有财产保护领域" value="4"></option>
                <option label="食品药品安全领域" value="5"></option>
                <option label="英烈保护领域" value="6"></option>
              </select>
            </div>
            <div style="margin: 8px 24px;height: 150px;">
              <classify-table :data="suitFieldDeal.pool[suitFieldDeal.currentTab]"></classify-table>
            </div>
          </chart-box>
        </div>
      </div>
      <div class="layout-side-r">
        <div style="height: 309px;margin: 0 0 24px 0;" v-loading="preSuitList.loading" element-loading-background="rgba(7,17,27,0.6)">
          <chart-box title="行政公益诉讼诉前程序">
            <BarChart :data="preSuitList.pool"></BarChart>
          </chart-box>
        </div>
        <div style="height: 309px;margin: 24px 0;" v-loading="suitSuggestion.loading" element-loading-background="rgba(7,17,27,0.6)">
          <chart-box title="检查建议接受单位">
            <div class="classic-table-wrap">
              <classic-table :data="suitSuggestion.pool"></classic-table>
            </div>
          </chart-box>
        </div>
        <div style="height: 296px;margin: 24px 0 0;"  v-loading="courtTrial.loading" element-loading-background="rgba(7,17,27,0.6)">
          <chart-box title="法院审结情况">
            <div slot="feature" style="float: right;margin-right: 24px;padding-top: 8px;">
              <tabs v-model="courtTrial.currentTab"></tabs>
            </div>
            <div class="multi-pieChart-wrap">
              <multiPieChart  title="75%" :data="courtTrial.pool[courtTrial.currentTab]"></multiPieChart>
            </div>
          </chart-box>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ChartBox from './components/deprecated/chartBox'
  import dataMap from './components/dataMap'
  import anhui from './asserts/anhui.json'

  import pieChart from '@/views/wpd/BI/components/pieChart'
  import CProgress from './components/progress'
  import RadarChart from './components/radarChart'
  import ClassifyTable from './components/classifyTable'
  import multiPieChart from './components/mutilPieChart'
  import ClassicTable from './components/classicTable'
  import BarChart from './components/barChart'
  import Tabs from './components/tab'

  export default {
    name: 'index',
    data() {
      return {
        mapJson: anhui,
        activeRegions: [''],
        currentArea: '340000',
        areaCode: [],
        suitType: {
          loading: false,
          currentTab: 'clue',
          pool: {
            clue: [],
            preSuit: [],
            file: [],
            suit: []
          },
          gradual: {
            penal: ['#00fffe', '#0090ff'],
            cival: ['#4aff9b', '#5cffea'],
            xfm: ['#7c71ff', '#e597ff']
          }
        },
        regionTop: {
          loading: false,
          currentTab: '',
          pool: []
        },
        suitFieldDistribute: {
          loading: false,
          currentTab: '',
          pool: []
        },
        suitSuggestion: {
          loading: false,
          pool: []
        },
        courtTrial: {
          loading: false,
          currentTab: '',
          pool: {}
        },
        suitFieldDeal: {
          loading: false,
          currentTab: 'environmentPollution',
          pool: {}
        },
        preSuitList: {
          loading: false,
          pool: {}
        },
        noticeAndsuggestion: {
          loading: false,
          pool: []
        }
      }
    },
    created() {
      this.getAreaCode()
      this.load()
    },
    mounted() {
      this.containerJustify()
      window.addEventListener('resize', this.containerJustify)
      document.body.style.overflow = 'hidden'
    },
    methods: {
      load() {
        this.getLaysuitType()
        this.getRegion()
        this.getSuitFieldDistribute()
        this.getPreSuitList()
        this.getSuitSuggestion()
        this.getCourtTrial()
        this.getSuitFieldDeal()
        this.getNotice()
      },
      handleAreaChange() {
        this.load()
      },
      handleMapChange(city) {
        city = this.areaCode.filter((area) => {
          return area.name === city
        })[0]
        this.currentArea = city.code
        this.load()
      },
      containerJustify() {
        this.$refs.dataContainer.style.height = document.documentElement.clientHeight + 'px'
        this.$refs.dataContainer.style.width = document.documentElement.clientWidth + 'px'
      },
      // 诉讼类型分布
      getLaysuitType() {
        this.suitType.loading = true
        this.fd.req({
          method: 'get',
          url: 'cap/api/suit/getSuitTypeDistribute',
          data: { cityCode: this.currentArea }
        })
          .then((res) => {
            return res.data
          })
          .then((data) => {
            for (const key in data) {
              data[key].forEach((item) => {
                switch (item.name) {
                  case '行政':
                    item.type = 'penal'
                    break
                  case '民事':
                    item.type = 'cival'
                    break
                  case '刑附民':
                    item.type = 'xfm'
                    break
                }
              })
            }
            this.suitType.pool = {
              clue: data.clue,
              file: data.filing,
              preSuit: data.beforeSuit,
              suit: data.suit
            }
          })
          .catch((err) => {
            console.error(err)
          })
          .then(() => {
            this.suitType.loading = false
          })
      },
      // 区域分布
      getRegion() {
        this.regionTop.loading = true
        this.fd.req({
          method: 'get',
          url: 'cap/api/suit/getSuitAreaDistribute',
          data: {
            cityCode: this.currentArea
          }
        })
          .then((res) => {
            return res.data
          })
          .then((data) => {
            this.regionTop.pool = data
          })
          .catch(() => {})
          .then(() => {
            this.regionTop.loading = false
          })
      },
      // 领域分布
      getSuitFieldDistribute() {
        this.suitFieldDistribute.loading = true
        this.fd.req({
          method: 'get',
          url: 'cap/api/suit/getSuitFieldDistribute',
          data: {
            cityCode: this.currentArea
          }
        })
          .then((res) => {
            return res.data
          })
          .then((data) => {
            for (const key in data) {
              data[key].forEach((item) => {
                item.total = Math.ceil(item.value * 100 / parseInt(item.rate))
              })
            }
            this.suitFieldDistribute.pool = data
          })
          .catch(() => {})
          .then(() => {
            this.suitFieldDistribute.loading = false
          })
      },
      // 行政公益诉讼诉前程序
      getPreSuitList() {
        this.preSuitList.loading = true
        this.fd.req({
          method: 'get',
          url: 'cap/api/suit/getSuitProgram',
          data: {
            cityCode: this.currentArea
          }
        })
          .then((res) => {
            return res.data
          })
          .then((data) => {
            this.preSuitList.pool = data
          })
          .catch(() => {})
          .then(() => {
            this.preSuitList.loading = false
          })
      },
      // 检查建议接受单位
      getSuitSuggestion() {
        this.suitSuggestion.loading = true
        this.fd.req({
          method: 'get',
          url: 'cap/api/suit/getSuitSuggestion',
          data: {
            cityCode: this.currentArea
          }
        })
          .then((res) => {
            return res.data
          })
          .then((data) => {
            this.suitSuggestion.pool = data
          })
          .catch(() => {})
          .then(() => {
            this.suitSuggestion.loading = false
          })
      },
      // 法院审结情况
      getCourtTrial() {
        this.courtTrial.loading = true
        this.fd.req({
          method: 'get',
          url: 'cap/api/suit/getCourtTrial',
          data: {
            cityCode: this.currentArea
          }
        })
          .then((res) => {
            return res.data
          })
          .then((data) => {
            for (const key in data) {
              data[key].forEach((item) => {
                item.other = Math.ceil(item.value * 100 / parseInt(item.rate) - item.value)
              })
            }
            this.courtTrial.pool = data
          })
          .catch(() => {})
          .then(() => {
            this.courtTrial.loading = false
          })
      },
      // 办案成效
      getSuitFieldDeal() {
        this.suitFieldDeal.loading = true
        this.fd.req({
          method: 'get',
          url: 'cap/api/suit/getSuitFieldDeal',
          data: {
            cityCode: this.currentArea
          }
        })
          .then((res) => {
            return res.data
          })
          .then((data) => {
            for (const key in data) {
              const group = {}
              data[key].forEach((item) => {
                if (group[item.name]) {
                  group[item.name].children.push(item)
                } else {
                  group[item.name] = {
                    name: item.name,
                    children: [item]
                  }
                }
              })
              data[key] = Object.keys(group).map(key => group[key])
            }
            this.suitFieldDeal.pool = data
          })
          .catch(() => {})
          .then(() => {
            this.suitFieldDeal.loading = false
          })
      },
      //  已发出公告和检查建议
      getNotice() {
        this.fd.req({
          method: 'get',
          url: 'cap/api/suit/getSuitCount',
          data: {
            cityCode: this.currentArea
          }
        })
          .then((res) => {
            return res.data
          })
          .then((data) => {
            this.noticeAndsuggestion.pool = data
          })
          .catch(() => {})
          .then(() => {
            this.noticeAndsuggestion.loading = false
          })
      },
      //  获取区域编码
      getAreaCode() {
        this.fd.req({
          url: 'uaa/api/groups/user',
          method: 'GET',
          params: {
            projectCode: 'zhmx',
            groupType: 'area'
          }
        })
          .then((res) => {
            return res.data
          })
          .then((data) => {
            data = data[0]
            this.areaCode = [data, ...data.children]
          })
          .catch(() => {})
          .then(() => {})
      }
    },
    filters: {
      overflow(data, max = 999999) {
        return data > max ? max + '+' : data
      }
    },
    components: {
      dataMap,
      pieChart,
      CProgress,
      RadarChart,
      ChartBox,
      ClassifyTable,
      multiPieChart,
      ClassicTable,
      BarChart,
      Tabs
    },
    destroyed() {
      window.removeEventListener('resize', this.containerJustify)
      document.body.style.overflow = ''
    }
  }
</script>

<style scoped lang="scss">
  .data-visual {
    width: 100%;
    height: 100%;
    background: url('./asserts/bg.png') no-repeat;
    background-size: cover;
    padding: 10px 32px 32px;
    box-sizing: border-box;
    color: #95e1ff;
    font-weight: normal;
    font-family: PingFang SC, Microsoft YaHei, Helvetica Neue, Helvetica, Hiragino Sans GB, Arial, sans-serif;
    position: relative;

    .header {
      height: 83px;
      text-align: center;
      letter-spacing: 1px;

      .text {
        font-family: baidu;
        width: 952px;
        margin: 0 auto;
        font-size: 36px;
        shape-outside: polygon(-47px 0, 0 51px, 526px 51px, 573px 0);
      }

      .pathWrap {
        position: absolute;
        left: 50%;
        top: 6px;
        transform: translate(-50%, 0);
      }
    }

    .layout {
      display: flex;
      width: 100%;
      height: calc(100% - 84px);

      .layout-side-l {
        flex: 0 0 524px;
        height: 100%;

        .lawsuit-type-wrap {
          margin-top: 40px;
          text-align: center;
        }

        .chart-desc {
          margin-top: 17px;
          font-size: 16px;
          text-align: center;
          font-weight: 600;
        }

        .progress-wrap {
          margin: 17px 24px;
        }
      }

      .layout-middle {
        flex: 1 1 2px;
        height: 100%;

        .overview-wrap {
          position: relative;

          .overview {
            width: 220px;
            height: 567px;
            position: absolute;
            right: 0;
            top: 0;
            z-index: 10;

            .c-select {
              border: solid 1px #0091ff;;
              border-radius: 8px;
              background: transparent;
              width: 180px;
              height: 40px;
              padding: 0 0 0 10px;
              font-family: baidu;
              font-size: 24px;
              outline: none;
              option{
                line-height: 1.5;
                background-color: rgba(9, 26, 88, 1);
                font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
                font-size: 16px;
                color: #fff;
              }
            }

            .overview-item {
              width: 180px;
              height: 94px;
              border: 2px solid rgba(0, 145, 255, 0.3);
              text-align: center;
              background-color: rgba(9, 56, 88, 0.3);

              .title {
                font-size: 20px;
                margin-top: 10px;
                color: #43ffea;
                font-weight: normal;
              }

              .number {
                margin-top: 8px;
                line-height: 40px;
                // 文字渐变
                /*background-image:-webkit-linear-gradient(bottom,red,#fd8403,yellow);
                -webkit-background-clip:text;
                -webkit-text-fill-color:transparent;*/
                color: #00fafe;;
                font-size: 40px;
                font-family: TRENDS;
              }

              &:first-child {
                margin-top: 16px;
              }

              &:not(:first-child) {
                margin-top: 32px;
              }
            }
          }
        }

        .notice-wrap {
          display: flex;
          margin: 0 0 24px 0;
          height: 75px;

          .notice {
            flex: 1;
            margin: 0 12px 0 24px;
            background: rgba(9, 56, 88, 0.2);
            border-color: #0084ff;
            border-width: 0 1px;
            border-style: solid;
            border-radius: 8px;
            font-size: 0;
            padding: 7px 0;

            &:last-child {
              margin: 0 24px 0 12px;
            }

            .img {
              margin: 0 8px 0 16px;
              vertical-align: middle;
            }

            .label-wps {
              display: inline-block;
              width: 78px;
              line-height: 25px;
              word-break: break-all;
              vertical-align: middle;
              color: #57ddd6;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 1px;
            }

            .number {
              display: inline-block;
              float: right;
              margin: 9px 16px 0 0;
              font-size: 40px;
              vertical-align: middle;
              font-family: TRENDS;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 4px;
              color: #57ddd6;

              .unit {
                font-size: 30px;
                font-weight: normal;
              }
            }
          }
        }

        .region-wrap {
          height: 296px;
          margin: 24px 24px 0 24px;

          .region-select {
            margin: 10px 24px 0 0;
            width: 180px;
            height: 26px;
            background-color: rgba(16, 47, 94, 0.3);
            border-radius: 13px;
            border: solid 1px #0091ff;
            outline: none;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #00d0e4;
            padding: 0 10px;
            option{
              background-color: rgba(9, 26, 88, 1);
            }
          }

          .region-header {
            margin-bottom: 15px;
            position: relative;
            text-align: right;
            .text {
              position: absolute;
              left: 50%;
              top: 0;
              transform: translate(-50%, 0);
              display: inline-block;
              text-align: center;
              font-family: baidu;
              font-weight: normal;
              font-size: 18px;
              line-height: 25px;
              letter-spacing: 2px;
              color: #95e1ff;
              padding: 4px 40px 4px 40px;
              background-image: radial-gradient(ellipse 70px 150px , #4869D7,  #044B9A);
              &:after, &:before {
                position: absolute;
                top: 0;
                content: '';
                display: inline-block;
                width: 32px;
                height: 34px;
                background: #044B9A;
              }

              &:before {
                left: -32px;
                shape-outside: polygon(0 0, 50% 100%, 100% 100%, 100% 0);
                clip-path: polygon(0 0, 50% 100%, 100% 100%, 100% 0);

              }

              &:after {
                right: -32px;
                shape-outside: polygon(0 0, 0 100%, 50% 100%, 100% 0);
                clip-path: polygon(0 0, 0 100%, 50% 100%, 100% 0);
              }
              svg{
                height: 32px;
              }
            }
          }
        }
      }

      .layout-side-r {
        flex: 0 0 524px;
        height: 100%;

        .multi-pieChart-wrap {
          width: 100%;
          height: 100%;
        }

        .classic-table-wrap {
          margin: 10px 24px 5px 24px;
        }
      }
    }

    .dataMap-wrap {
      width: calc(100% - 220px);
      height: 567px;
    }

    .pieChart-wrap {
      display: inline-block;
      margin: 20px 10px;
      width: 130px;
      height: 130px;
    }
  }
</style>

