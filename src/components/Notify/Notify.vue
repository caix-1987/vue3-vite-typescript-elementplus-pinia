<script lang="ts" setup>
import { ref, computed } from "vue";
import { type IListItem, notifyData, messageData, todoData } from "./data";
import NotifyList from "./NotifyList.vue";
type TabNameType = "通知" | "消息" | "待办";

interface TabItem {
  name: TabNameType;
  type: "primary" | "success" | "warning" | "danger" | "info";
  list: IListItem[];
}

const badgeValue = computed(() => {
  return notifyData.length + messageData.length + todoData.length;
});
/* 面板宽度 */
const POPOVER_WIDTH = 380;
/* 角标最大值 */
const BADGE_MAX = 99;
/* 当前的 tab */
const activeName = ref<TabNameType>("通知");
/* tab 数据源 */
const list = ref<TabItem[]>([
  // 通知
  {
    name: "通知",
    type: "primary",
    list: notifyData,
  },
  // 消息
  {
    name: "消息",
    type: "danger",
    list: messageData,
  },
  // 待办
  {
    name: "待办",
    type: "warning",
    list: todoData,
  },
]);
</script>

<template>
  <div class="app-notify">
    <el-popover placement="bottom" trigger="click" :width="POPOVER_WIDTH">
      <template #reference>
        <el-badge :value="badgeValue" :max="BADGE_MAX" :hidden="false">
          <el-tooltip effect="dark" content="消息通知" placement="bottom">
            <el-icon class="icon">
              <Bell />
            </el-icon>
          </el-tooltip>
        </el-badge>
      </template>
      <template #default>
        <el-tabs v-model="activeName" type="" stretch>
          <el-tab-pane v-for="item in list" :key="item.type" :name="item.name">
            <template #label>
              {{ item.name }}
              <el-badge
                :value="item.list.length"
                :max="BADGE_MAX"
                :type="item.type"
              ></el-badge>
            </template>
            <NotifyList :list="item.list" />
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
.app-notify {
  margin-right: 50px;
  cursor: pointer;
  .icon {
    color: #ffffff;
    vertical-align: middle;
    font-size: 24px;
  }
}
</style>
