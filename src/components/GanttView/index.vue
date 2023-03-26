<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { type IGanttList } from "@/components/GanttView/data";
import { getGanttDataApi } from "@/api/gantt";
import GanttUtil, { type IGanttInitData } from "@/components/GanttView/Gantt";
import GanttBar from "@/components/GanttView/GanttBar.vue";

interface spanMethodProps {
  columnIndex: number;
}

const tableData = ref<IGanttList[]>([]);
const min_max_data = ref();
const ganttEndInitData = ref<IGanttInitData[]>([]);
const ganttIntervalDay = ref<number>(0);
const loading = ref<boolean>(false);
const radio_1 = ref("1");
const radio_2 = ref("2");
const radio_3 = ref("3");
const getGanttList = async () => {
  try {
    loading.value = true;
    const result: any = await getGanttDataApi();
    tableData.value = result.data;

    min_max_data.value = await GanttUtil.getMinAndMaxDate(tableData.value);

    ganttEndInitData.value = await GanttUtil.initGanttData(
      min_max_data.value.minDate,
      min_max_data.value.maxDate
    );

    ganttIntervalDay.value = GanttUtil.tableDataFormat(
      tableData.value,
      min_max_data.value
    );
  } catch (e) {
    console.log("e", e);
  } finally {
    loading.value = false;
  }
};

const spanMethod = ({ columnIndex }: spanMethodProps) => {
  if (columnIndex === 3) {
    //从第4列开始，共合10行
    return [1, ganttIntervalDay.value];
  } else {
    //其他行(1、2、3列)保持不变
    return [1, 1];
  }
};

const selectGanttType = (val: string | number | boolean) => {
  console.log("val", val);
};

onMounted(() => {
  getGanttList();
});
</script>

<template>
  <el-card class="app-ganttView">
    <div class="selectGantt">
      <el-radio-group v-model="radio_1" size="small" @change="selectGanttType">
        <el-radio-button label="1">日视图</el-radio-button>
        <el-radio-button label="2" disabled>周视图</el-radio-button>
        <el-radio-button label="3" disabled>月视图</el-radio-button>
      </el-radio-group>
    </div>
    <el-table
      :data="tableData"
      :border="true"
      :span-method="spanMethod"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      default-expand-all
      style="width: 100%; margin-bottom: 20px"
      v-loading="loading"
    >
      <el-table-column
        fixed
        align="center"
        width="160"
        prop="name"
        label="项目名称"
      ></el-table-column>
      <el-table-column
        fixed
        align="center"
        width="120"
        prop="planStartDate"
        label="计划开始时间"
      ></el-table-column>
      <el-table-column
        fixed
        align="center"
        width="120"
        prop="planEndDate"
        label="计划结束时间"
      ></el-table-column>
      <el-table-column
        v-for="(item, index) in ganttEndInitData"
        :label="item.year_mounth"
        :key="index"
        align="center"
      >
        <el-table-column
          v-for="(ele, nex) in item.children"
          :key="nex"
          :prop="ele"
          :label="ele"
          width="60"
          align="center"
        >
          <template v-if="nex === 0" v-slot="scope">
            <GanttBar :progressItem="scope.row" />
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style lang="scss" scoped>
.selectGantt {
  margin: 10px 0;
  display: flex;
  justify-content: center;
}

:deep(.el-table__placeholder) {
  margin-left: 20px;
}
:deep(.el-table__row--level-1 .cell) {
  color: #606266;
}
:deep(.el-table .cell) {
  padding: 0 !important;
}
</style>
