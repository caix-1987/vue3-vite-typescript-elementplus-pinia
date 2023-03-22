import { type IGanttList } from "./data";
interface ImaxminDate {
  minDate: string;
  maxDate: string;
}
interface IDataInit {
  "M+": number; // 月
  "d+": number; // 日
  "h+": number; // 小时
  "m+": number; // 分
  "s+": number; // 秒
  "q+": number; // 季度
  S: number; // 毫秒
  "k+"?: any;
}
export interface IGanttInitData {
  year_mounth: string;
  children: string[];
}
class GanttUtil {
  /* 获取较小和较大值 */
  async getMinAndMaxDate(tableData: IGanttList[]): Promise<ImaxminDate> {
    /* 变量后加 ! 避免赋值前使用变量报错 TypeScript 2.7引入了一个新的控制严格性的标记 --strictPropertyInitialization，确保每个实例的属性都会初始值 */
    let minD!: IGanttList;
    let maxD!: IGanttList;
    const minMaxDate: ImaxminDate = {
      minDate: "",
      maxDate: "",
    };

    tableData.forEach((item) => {
      // 最小计划开始时间
      minD = tableData.reduce((pre, cur) => {
        return this.dateFormatDay(pre.planStartDate) <
          this.dateFormatDay(cur.planStartDate)
          ? pre
          : cur;
      });

      // 最大计划结束时间
      maxD = tableData.reduce((pre, cur) => {
        return this.dateFormatDay(pre.planEndDate) >
          this.dateFormatDay(cur.planEndDate)
          ? pre
          : cur;
      });

      if (item.children && item.children.length) {
        this.getMinAndMaxDate(item.children);
      }
    });
    minMaxDate.maxDate = maxD.planEndDate;
    minMaxDate.minDate = minD.planStartDate;
    return minMaxDate;
  }

  /* 给表格数据加入 left 和 right 字段用于展示项目时间进度 */
  tableDataFormat(tableData: IGanttList[], minMaxDate: ImaxminDate) {
    const minMaxInDay = this.dateSubtract(
      minMaxDate.minDate,
      minMaxDate.maxDate
    );
    tableData.forEach((item) => {
      item["left"] =
        ((this.dateSubtract(minMaxDate.minDate, item.planStartDate) - 1) /
          minMaxInDay) *
          100 +
        "%";

      item["right"] =
        ((this.dateSubtract(item.planEndDate, minMaxDate.maxDate) - 1) /
          minMaxInDay) *
          100 +
        "%";

      if (item.children && item.children.length) {
        this.tableDataFormat(item.children, minMaxDate);
      }
    });
    console.log("minMaxInDay", minMaxInDay);
    return minMaxInDay;
  }

  async initGanttData(
    startDate: string,
    endDate: string
  ): Promise<IGanttInitData[]> {
    console.log("startDate_endDate", startDate, endDate);
    const start = this.dateFormatDay(startDate);
    const end = this.dateFormatDay(endDate);

    const str_year_mounth_day_arr: string[] = [];
    let str_year_mounth_arr: string[] = [];

    const ganttEndInitData: IGanttInitData[] = [];

    let i, j;

    console.log("star_end", start, end);

    for (i = start, j = 0; i <= end; i++, j++) {
      str_year_mounth_day_arr[j] = this.dayFormatDate(i);
      str_year_mounth_arr[j] = this.dayFormatDate(i).slice(0, 7);
    }

    str_year_mounth_arr = [...new Set(str_year_mounth_arr)];

    str_year_mounth_arr.forEach((item) => {
      const ganttNum: string[] = [];
      str_year_mounth_day_arr.forEach((ele) => {
        if (ele.indexOf(item) > -1) {
          ganttNum.push(ele.slice(8, 10));
        }
      });
      const ganttInitData: IGanttInitData = {
        year_mounth: item,
        children: ganttNum,
      };
      ganttEndInitData.push(ganttInitData);
    });

    console.log("ganttEndInitData", ganttEndInitData);

    return ganttEndInitData;
  }

  /* 日期格式转天数 */
  dateFormatDay(date: string): number {
    return new Date(date).getTime() / 1000 / 60 / 60 / 24;
  }

  /* 日期相减求差值 */
  dateSubtract(startDate: string, endDate: string) {
    return this.dateFormatDay(endDate) - this.dateFormatDay(startDate) + 1;
  }

  /* 天数转为日期格式 */
  dayFormatDate(dateInDay: number) {
    const ndate = new Date(dateInDay * 24 * 60 * 60 * 1000);
    let type = "yyyy-MM-dd";
    const o: IDataInit = {
      "M+": ndate.getMonth() + 1, // 月份
      "d+": ndate.getDate(), // 日
      "h+": ndate.getHours(), // 小时
      "m+": ndate.getMinutes(), // 分
      "s+": ndate.getSeconds(), // 秒
      "q+": Math.floor((ndate.getMonth() + 3) / 3), // 季度
      S: ndate.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(type))
      type = type.replace(
        RegExp.$1,
        (ndate.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (const k in o) {
      if (new RegExp("(" + k + ")").test(type))
        type = type.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    }
    return type;
  }
}
export default new GanttUtil();
