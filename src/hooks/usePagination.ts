import { reactive } from "vue";

interface IDdfaulePaginationData {
  total: number;
  currentPage: number;
  pageSizes: number[];
  pageSize: number;
  layout: string;
}

interface IPaginationData {
  total?: number;
  currentPage?: number;
  pageSizes?: number[];
  pageSize?: number;
  layout?: string;
}

const defaultPaginationData: IDdfaulePaginationData = {
  total: 0,
  currentPage: 1,
  pageSizes: [10, 20, 50],
  pageSize: 10,
  layout: "total,sizes,prev,pager,next,jumper",
};

export function usePagination(_paginationData: IPaginationData = {}) {
  const paginationData = reactive(
    Object.assign({ ...defaultPaginationData }, _paginationData)
  );
  const handleCurrentChange = (value: number) => {
    paginationData.currentPage = value;
  };

  const handleSizeChange = (value: number) => {
    paginationData.pageSize = value;
  };

  return { paginationData, handleCurrentChange, handleSizeChange };
}
