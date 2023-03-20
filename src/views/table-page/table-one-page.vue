<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import {
  createTableDataApi,
  deleteTableDataApi,
  updateTableDataApi,
  getTableDataApi,
} from "@/api/table";
import { type IGetTableData } from "@/api/table/types/table";
import { usePagination } from "@/hooks/usePagination";

const { paginationData, handleCurrentChange, handleSizeChange } =
  usePagination();
const tableData = ref<IGetTableData[]>([]);
const getTableData = () => {
  getTableDataApi({
    currentPage: paginationData.currentPage,
    size: paginationData.pageSize,
    username: "",
    phone: "",
  })
    .then((res) => {
      tableData.value = res.data;
      console.log("res111", res);
    })
    .catch((e) => {
      console.log("eeee", e);
    })
    .finally(() => {
      console.log("finally");
    });
};

watch(
  [() => paginationData.currentPage, () => paginationData.pageSize],
  getTableData,
  { immediate: true }
);
</script>

<template>
  <div class="app-table-one">
    <el-card>
      <el-form>
        <el-form-item>
          <el-input placeholder="请输入" />
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column prop="username" label="用户名" algin="center" />
          <el-table-column prop="roles" label="角色" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.roles === 'admin'" effect="plain"
                >admin</el-tag
              >
              <el-tag v-else type="warning" effect="plain">{{
                scope.row.roles
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" align="center" />
          <el-table-column prop="email" label="邮箱" align="center" />
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<style scoped></style>
