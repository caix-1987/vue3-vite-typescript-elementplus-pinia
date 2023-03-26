<script lang="ts" setup>
import * as echarts from "echarts";
import { reactive, nextTick, onMounted, ref } from "vue";
import { optionOne } from "@/components/Chart/options/chart-one-option";
import { optionTwo } from "@/components/Chart/options/chart-two-option";
import { optionThree } from "@/components/Chart/options/chart-three-option";
import { optionFour } from "@/components/Chart/options/chart-four-option";
import { optionFive } from "@/components/Chart/options/chart-five-option";
import { optionSix } from "@/components/Chart/options/chart-six-option";

interface InitInfo {
  id: string;
  option: any;
}

const list = ref();

const echartsList = reactive<InitInfo[]>([
  {
    id: "chart-one",
    option: optionOne,
  },
  {
    id: "chart-two",
    option: optionTwo,
  },
  {
    id: "chart-three",
    option: optionThree,
  },
  {
    id: "chart-four",
    option: optionFour,
  },
  {
    id: "chart-five",
    option: optionFive,
  },
  {
    id: "chart-six",
    option: optionSix,
  },
]);

const initEcharts = () => {
  list.value = echartsList.map((item) => {
    const chart = echarts.init(document.getElementById(item.id));
    chart.setOption(item.option);
    return chart;
  });
};

nextTick(() => {
  initEcharts();
});

onMounted(() => {
  window.addEventListener("resize", () => {
    list.value.forEach((item: any) => {
      item.resize();
    });
  });
});
</script>

<template>
  <div class="app-chart">
    <el-card class="chart-list" v-for="item in echartsList" :key="item.id">
      <div class="chart" :id="item.id"></div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.app-chart {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  .chart-list {
    min-width: 49.5%;
    width: 49.5%;
    margin-bottom: 20px;
    .chart {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
