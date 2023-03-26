import { request } from "@/utils/service";

/** 查询数据 */
export function getGanttDataApi() {
  return request({
    url: "gantt",
    method: "get",
  });
}
