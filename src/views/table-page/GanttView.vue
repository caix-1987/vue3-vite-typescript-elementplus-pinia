<template>
  <div>
    <el-table :cell-style="{padding:'2px 0'}" :span-method="columnSpanMethod"
              :data="tableData" style="width: 100%; margin-bottom: 20px;" row-key="id"
              border stripe default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column fixed prop="name" label="活动名称" header-align="center" width="180"></el-table-column>
      <el-table-column fixed prop="planStartDate" label="计划开始时间" header-align="center" width="110"></el-table-column>
      <el-table-column fixed prop="planEndDate" label="计划结束时间" header-align="center" width="110"></el-table-column>
      <el-table-column v-for="(ym,ind) in this.dVAObjArr" :label="ym.yearMonth" header-align="center" :key="ind">
        <el-table-column v-for="(ymd,index) in ym.children" :prop="ymd" :label="ymd" :key="index" width="40">
          <template v-if="index === 0" slot-scope="scope">
            <div class="fsc-progress">
              <div class="fsc-progress-bar"
                   :style="{marginLeft: scope.row.marginLeftPer, marginRight: scope.row.marginRightPer}">
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "MenuView",
  data() {
    return {
      tableData: [{
        id: 1,
        name: '规划与研究',
        planStartDate: '2022-04-27',
        planEndDate: '2022-05-16',
        c_1: 1,
        children: [{
          id: 11,
          name: 'Offering规划',
          planStartDate: '2022-05-01',
          planEndDate: '2022-05-13',
          c_1: 11,
          children: [{
            id: 111,
            name: '行业洞察',
            planStartDate: '2022-05-01',
            planEndDate: '2022-05-06',
            c_1: 111,
          }, {
            id: 112,
            name: '行解方案规划',
            planStartDate: '2022-05-04',
            planEndDate: '2022-05-16',
            c_1: 112,
          }]
        }]
      }, {
        id: 2,
        name: '规划与研究2',
        planStartDate: '2022-05-02',
        planEndDate: '2022-05-15',
        c_1: 2,
        children: [{
          id: 21,
          name: 'Offering规划2',
          planStartDate: '2022-05-02',
          planEndDate: '2022-05-10',
          c_1: 21,
          children: [{
            id: 211,
            name: '行业洞察2',
            planStartDate: '2022-05-02',
            planEndDate: '2022-05-10',
            c_1: 211,
          }, {
            id: 212,
            name: '行解方案规划2',
            planStartDate: '2022-05-04',
            planEndDate: '2023-05-15',
            c_1: 212,
          }]
        }]
      }],
      minMaxDate: {},
      ganttInDay: [],
      ganttInWeek: [],
      ganttInMonth: [],
      spanMinMaxInDay: 0,
      dVAObjArr: []
    }
  },
  created() {
    this.paintProgressBar(this.tableData)
    this.dVAObjArr = this.genDayViewArray(this.minMaxDate.minDate,this.minMaxDate.maxDate)
  },
  methods: {
    paintProgressBar(tableData){
      let minMax = this.dateMinMax(tableData)
      this.minMaxDate = minMax
      this.spanMinMaxInDay = this.dateStrMinus(minMax.minDate,minMax.maxDate)
      this.ganttInDay = new Array(this.spanMinMaxInDay).fill(1).map( (v,i) => ++i )
      console.log("minMaxDate:", minMax, "spanMinMaxInDay:",this.spanMinMaxInDay);
      tableData.forEach( i => {
        // 必须要转化为%, 否则样式渲染不出来
        i.marginLeftPer = ((this.dateStrMinus(minMax.minDate, i.planStartDate)-1) / this.spanMinMaxInDay) * 100 + '%'
        i.marginRightPer = ((this.dateStrMinus(i.planEndDate, minMax.maxDate)-1) / this.spanMinMaxInDay) * 100 + '%'
        if( i.children.length > 0 ){
          i.children.forEach( j => {
            j.marginLeftPer = ((this.dateStrMinus(minMax.minDate, j.planStartDate)-1) / this.spanMinMaxInDay) * 100 + '%'
            j.marginRightPer = ((this.dateStrMinus(j.planEndDate, minMax.maxDate)-1) / this.spanMinMaxInDay) * 100 + '%'
            if( j.children.length > 0 ){
              j.children.forEach( k => {
                k.marginLeftPer = ((this.dateStrMinus(minMax.minDate, k.planStartDate)-1) / this.spanMinMaxInDay) * 100 + '%'
                k.marginRightPer = ((this.dateStrMinus(k.planEndDate, minMax.maxDate)-1) / this.spanMinMaxInDay) * 100 + '%'
              })
            }
          })
        }
      })
      console.log("this.tableData:", this.tableData)
    },

    // 天数 转为 “2016-05-15”格式
    num2DateStr(dateInDay) {
      var ndate = new Date(dateInDay * 24 * 60 * 60 * 1000)
      let type = 'yyyy-MM-dd'
      const o = {
        'M+': ndate.getMonth() + 1, // 月份
        'd+': ndate.getDate(), // 日
        'h+': ndate.getHours(), // 小时
        'm+': ndate.getMinutes(), // 分
        's+': ndate.getSeconds(), // 秒
        'q+': Math.floor((ndate.getMonth() + 3) / 3), // 季度
        'S': ndate.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(type)) type = type.replace(RegExp.$1, (ndate.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (const k in o) {
        if (new RegExp('(' + k + ')').test(type)) type =
            type.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
      return type
    },

    // 两个“2016-05-15”格式 相减
    dateStrMinus(startDate, endDate) {
      // console.log("startDate:", startDate,";endDate:", endDate)
      let spanDate = this.dateStr2Num(endDate) - this.dateStr2Num(startDate) + 1

      return spanDate
    },

    // “2016-05-15” 格式转 天数
    dateStr2Num(date) {
      let i_date = new Date(date).getTime() / 1000 / 60 / 60 / 24
      return i_date
    },

    dateMinMax(tableData) {
      //取比较大的值
      let minDate = this.dateStr2Num("2099-12-31");
      //取比较小的值
      let maxDate = 0;
      tableData.forEach(i => {
        let i_planStartDate = this.dateStr2Num(i.planStartDate)
        let i_planEndDate = this.dateStr2Num(i.planEndDate)
        if (i.planStartDate && i_planStartDate < minDate) {
          minDate = i_planStartDate
        }
        if (i.planEndDate && i_planEndDate > maxDate) {
          maxDate = i_planEndDate
        }
        // console.log("minDate:", minDate, ",maxDate:", maxDate);
        if (i.children.length > 0) {
          i.children.forEach(j => {
            let j_planStartDate = this.dateStr2Num(j.planStartDate)
            let j_planEndDate = this.dateStr2Num(j.planEndDate)
            if (j.planStartDate && j_planStartDate < minDate) {
              minDate = j_planStartDate
            }
            if (j.planEndDate && j_planEndDate > maxDate) {
              maxDate = j_planEndDate
            }
            if (j.children.length > 0) {
              j.children.forEach(k => {
                let k_planStartDate = this.dateStr2Num(k.planStartDate)
                let k_planEndDate = this.dateStr2Num(k.planEndDate)
                if (k.planStartDate && k_planStartDate < minDate) {
                  minDate = k_planStartDate
                }
                if (k.planEndDate && k_planEndDate > maxDate) {
                  maxDate = k_planEndDate
                }
              })
            }
          })
        }
      })

      let minMaxDate = {
        //in day (num)
        // minDate: minDate,
        // maxDate: maxDate

        // in date (str)
        minDate: this.num2DateStr(minDate),
        maxDate: this.num2DateStr(maxDate)
      }
      return minMaxDate;
    },

    // 生成日视图数组， 格式为(入参为 '2022-05-05','2022-06-25':
    //[
    //  {
    //  yearMonth:'2022-05',
    //  children: ['05','06','07','...','31']
    //  },{
    //  yearMonth:'2022-06',
    //  children: ['01','02','03','...','25']
    //  },
    //]
    genDayViewArray(iStartDate, iEndDate){
      let numStartDate = this.dateStr2Num(iStartDate)
      let numEndDate = this.dateStr2Num(iEndDate)
      let i,j
      //年月日数组
      let strYMDArr = []
      //年月数组，需要去重
      let strYMArr = []
      for(i = numStartDate, j = 0; i <= numEndDate ; i++, j++ ){
        strYMDArr[j] = this.num2DateStr(i)
        strYMArr[j] = this.num2DateStr(i).slice(0,7)
      }
      //年月数组，已经去重
      strYMArr = [...new Set(strYMArr)];

      // date View Object Array
      let dVAObjArr = []
      strYMArr.forEach( ym => {
        let dateArr = []
        strYMDArr.forEach( ymd => {
          if(ymd.indexOf(ym) > -1 ){
            dateArr.push( ymd.slice(8,10) )
          }
        })
        let dVAObj0 = {
          yearMonth: ym,
          children: dateArr
        }
        dVAObjArr.push(dVAObj0)
      })
      console.log("dVAObjArr:", dVAObjArr)
      return dVAObjArr
    },

    // 合并单元格
    // columnSpanMethod({ row, column, rowIndex, columnIndex }) {
    columnSpanMethod({columnIndex}) {
      //   console.log(row, column, rowIndex);
      // if (rowIndex % 2 === 0) {  //所有行都执行
      if (columnIndex === 3) {   //从第4列开始，共合10行
        return [1, this.spanMinMaxInDay];
      } else {                   //其他行(1、2、3列)保持不变
        return [1, 1];
      }
      // }
      // else{
      //   if (columnIndex === 5) {   //从第4列开始，共合10行
      //     return [1, 8];
      //   } else{                   //其他行(1、2、3列)保持不变
      //     return [1, 1];
      //   }
      // }
    },
  },
}
</script>

<style scoped>
>>> .el-progress-bar__outer {
  border-radius: 0;
}

>>> .el-progress-bar__inner {
  border-radius: 0;
}

/deep/ .el-table .cell {
  padding-left: 0px;
  padding-right: 0px;
}

.fsc-progress {
  /*background-color: #e5efe2;*/
  height: 15px;
  width: 100%;
}

.fsc-progress-bar {
  background-color: #42b983;
  height: 15px;
  /*margin-left: 1%;*/
  /*margin-right: 2%;*/
  /*width: 100%;*/
}
</style>
