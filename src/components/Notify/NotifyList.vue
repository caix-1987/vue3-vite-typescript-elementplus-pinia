<script lang="ts" setup>
/* 联合类型定义 */
import { PropType } from "vue";
import { type IListItem } from "./data";

const props = defineProps({
  list: {
    /* 假如我有一个 todoItem 组件，需要 item 信息属性，需要准守 IListItem interface */
    type: Object as PropType<IListItem[]>,
    required: true,
  },
});
</script>

<template>
  <el-scrollbar heigth="480px" max-height="480px">
    <el-empty v-if="props.list.length === 0"></el-empty>
    <div v-else class="app-notifyList">
      <div class="notifyItem" v-for="item in list" :key="item.title">
        <div class="title">{{ item.title }}</div>
        <div class="time-icon">
          <span class="time">
            <el-tag v-if="item.dateTime">{{ item.dateTime }}</el-tag>
            <el-tag v-else-if="item.extra" :type="item.status">{{
              item.extra
            }}</el-tag>
          </span>
          <svg-icon :name="item.avatar" font-size="32"></svg-icon>
        </div>
        <div class="des">{{ item.description }}</div>
      </div>
    </div>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.app-notifyList {
  .notifyItem {
    padding: 10px;
    margin-bottom: 10px;
    background: #f4f4f4;
    border-radius: 2px;
    cursor: pointer;
    .title {
      font-weight: 600;
      font-size: 14px;
    }
    .time-icon {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0;
    }
    .des {
      font-size: 12px;
      color: #333333;
    }
    &:hover {
      background: #ecf5ff;
    }
  }
}
</style>
