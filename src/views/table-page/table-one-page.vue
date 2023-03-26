<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { ElMessage, FormRules, type FormInstance } from "element-plus";
import { mockTableItem, mockTableList } from "@/mock";
import {
  createTableDataApi,
  deleteTableDataApi,
  updateTableDataApi,
  getTableDataApi,
} from "@/api/table";
import { type IGetTableData } from "@/api/table/types/table";
import { usePagination } from "@/hooks/usePagination";
import { result } from "lodash-es";

interface SearchForm {
  username: string;
  phone: string;
}

const loading = ref<boolean>(false);
const dialogShow = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const rowIndex = ref<number>(0);
const { paginationData, handleCurrentChange, handleSizeChange } =
  usePagination();
const tableData = ref<IGetTableData[]>([]);
const getSelectTableData = ref<IGetTableData[]>([]);
const formRef = ref<FormInstance>();
const formRules = reactive<FormRules>({
  username: [{ required: true, trigger: "red", message: "请输入姓名" }],
  phone: [{ required: true, trigger: "red", message: "请输入电话号码" }],
});
const formData = reactive<SearchForm>({
  username: "",
  phone: "",
});
const searchForm = reactive<SearchForm>({
  username: "",
  phone: "",
});
const addData = () => {
  dialogShow.value = true;
};
const edit = (index: number, row: IGetTableData) => {
  dialogShow.value = true;
  isEdit.value = true;
  rowIndex.value = index;
  formData.username = row.username;
  formData.phone = row.phone;
};
const del = (index: number) => {
  tableData.value.splice(index, 1);
};
const getSelectData = (val: IGetTableData[]) => {
  getSelectTableData.value = val;
};
const moreDel = () => {
  if (!getSelectTableData.value.length) {
    ElMessage.error("请先选择要删除的数据");
    return;
  }
  tableData.value = tableData.value.filter((item) =>
    getSelectTableData.value.every((ele) => {
      return item.id != ele.id;
    })
  );
};
const createSure = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      if (isEdit.value) {
        tableData.value[rowIndex.value].username = formData.username;
        tableData.value[rowIndex.value].phone = formData.phone;
        ElMessage.success("修改数据成功");
      } else {
        const result = await mockTableItem(formData.username, formData.phone);
        tableData.value = [...result.data, ...tableData.value];
        ElMessage.success("新增数据成功");
      }
      isEdit.value = false;
      dialogShow.value = false;
    } else {
      return false;
    }
  });
};
const resetForm = () => {
  formData.username = "";
  formData.phone = "";
  isEdit.value = false;
};
const searchTableData = async () => {
  loading.value = true;
  if (!Object.values(searchForm).join("").length) {
    ElMessage.error("请输入您要查询的信息");
    loading.value = false;
    return;
  }
  try {
    const result = await mockTableItem(searchForm.username, searchForm.phone);
    paginationData.total = 1;
    tableData.value = result.data;
  } catch (e) {
    console.log("e", e);
  } finally {
    loading.value = false;
  }
};
const getTableData = async () => {
  loading.value = true;
  try {
    const result: any = await mockTableList();
    searchForm.username = "";
    searchForm.phone = "";
    paginationData.total = result.total || 100;
    tableData.value = result.list;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};
watch(
  [() => paginationData.currentPage, () => paginationData.pageSize],
  getTableData,
  { immediate: true }
);
</script>

<template>
  <div class="app-content">
    <el-card>
      <div class="table-wrapper">
        <div class="opertion">
          <div class="search">
            <el-input
              placeholder="请输入姓名"
              class="mr"
              v-model="searchForm.username"
            />
            <el-input
              placeholder="请输入手机"
              class="mr"
              v-model="searchForm.phone"
            />
            <el-button type="primary" @click="searchTableData">查询</el-button>
            <el-button type="warning" @click="getTableData">重置表格</el-button>
          </div>
          <div class="addDel">
            <el-button type="primary" @click="addData">新增数据</el-button>
            <el-button type="danger" @click="moreDel">批量删除</el-button>
          </div>
        </div>
        <el-table
          :data="tableData"
          :border="true"
          highlight-current-row
          v-loading="loading"
          @selection-change="getSelectData"
        >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="username" label="姓名" align="center" />
          <el-table-column prop="status" label="性别" align="center">
            <template #default="scope">
              <el-tag
                effect="plain"
                :type="scope.row.status === '女' ? 'danger' : ''"
                >{{ scope.row.status }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" align="center" />
          <el-table-column prop="email" label="邮箱" align="center" />
          <el-table-column prop="roles" label="身份" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.roles === 'admin'">admin</el-tag>
              <el-tag v-else type="warning">{{ scope.row.roles }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            align="center"
          ></el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-button
                plain
                type="success"
                size="small"
                @click="edit(scope.$index, scope.row)"
                >修改</el-button
              >
              <el-button
                plain
                type="danger"
                size="small"
                @click="del(scope.$index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
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
    <el-dialog
      v-model="dialogShow"
      :title="isEdit ? '修改信息' : '新增用户'"
      @close="resetForm"
      width="36%"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="100px"
        label-position="left"
      >
        <el-form-item prop="username" label="姓名">
          <el-input v-model="formData.username" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item prop="phone" label="电话">
          <el-input v-model="formData.phone" placeholder="请输入电话号码" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogShow = false">取消</el-button>
        <el-button type="primary" @click="createSure(formRef)">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.table-wrapper {
  .opertion {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .search {
      display: flex;
      align-items: center;
    }
  }
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
