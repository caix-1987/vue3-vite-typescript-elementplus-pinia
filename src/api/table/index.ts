import { request } from "@/utils/service";
import type * as Table from "./types/table";

/** 添加数据 */
export function createTableDataApi(data: Table.ICreateTableRequestData) {
  return request({
    url: "table",
    method: "post",
    data,
  });
}

/** 删除数据 */
export function deleteTableDataApi(id: string) {
  return request({
    url: `table/${id}`,
    method: "delete",
  });
}

/** 修改数据 */
export function updateTableDataApi(data: Table.IUpdateTableRequestData) {
  return request({
    url: "table",
    method: "put",
    data,
  });
}

/** 查询数据 */
export function getTableDataApi(params: Table.IGetTableRequestData) {
  return request<Table.GetTableResponseData>({
    url: "table",
    method: "get",
    params,
  });
}
