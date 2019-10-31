<template>
  <div class="classicTable">
    <div class="header-wrap">
      <table>
        <colgroup>
          <col name="classic-table-col-1" width="228px" align="center" valign="middle">
          <col name="classic-table-col-2" width="82" align="center" valign="middle">
          <col name="classic-table-col-3" width="84px" align="center" valign="middle">
          <col name="classic-table-col-4" width="82px" align="center" valign="middle">
        </colgroup>
        <thead class="classic-table-header">
        <tr>
          <th class="classic-table-col-1">单位名称</th>
          <th class="classic-table-col-2">数量/件</th>
          <th class="classic-table-col-3">纠正违...</th>
          <th class="classic-table-col-4">逾期违...</th>
        </tr>
        </thead>
      </table>
    </div>
    <div class="body-wrap">
      <table>
        <colgroup>
          <col name="classic-table-col-1" width="228px" align="center" valign="middle">
          <col name="classic-table-col-2" width="82" align="center" valign="middle">
          <col name="classic-table-col-3" width="84px" align="center" valign="middle">
          <col name="classic-table-col-4" width="82px" align="center" valign="middle">
        </colgroup>
        <tbody class="classic-table-body">
        <tr v-for="item in data">
          <td class="classic-table-td">{{item.organ}}</td>
          <td class="classic-table-col-td">{{item.num}}</td>
          <td class="classic-table-col-td">{{item.rectifyNum}}</td>
          <td class="classic-table-col-td">{{item.overdueNum}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'classicTable',
    props: {
      data: Array
    }
  }
</script>

<style scoped lang="scss">
  .classicTable {
    font-family: SourceHanSansCN-Medium;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #95e1ff;

    [class ^= 'classic-table-col'] {
      text-align: center;
      font-weight: normal;
      letter-spacing: 1px;
      padding: 4px 0;
    }

    .classic-table-col-1 {
      background-color: rgba(9, 88, 255, 0.6);
      border-radius: 6px 0 0 0;
    }

    .classic-table-col-2 {
      background-color: rgba(9, 139, 255, 0.6);
    }

    .classic-table-col-3 {
      background-color: rgba(9, 185, 255, 0.6);
    }

    .classic-table-col-4 {
      background-color: rgba(9, 219, 255, 0.6);
      border-radius: 0 6px 0 0;
    }

    .classic-table-body{
      [class ^= 'classic-table']{
        line-height: 24px;
        padding: 8px 0;
        font-size: 16px;
        background: transparent;
        &:nth-child(1) {
          color: #95e1ff;
          padding-left: 5px;
        }
        &:nth-child(2) {
          color: #0091ff;
        }
        &:nth-child(3) {
          color: #27caff;
        }
        &:nth-child(3) {
          color: #66dce2;
        }
      }
      tr:nth-child(2n + 1) td:first-child{
        background-color: rgba(9, 88, 255, 0.3);
      }
      tr:nth-child(2n) td:first-child{
        background-color:  rgba(9, 88, 255, 0.12);
      }
    }
  }
</style>
