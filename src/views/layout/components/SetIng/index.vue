<script lang="ts" setup>
import { useSettingStore } from "@/store/modules/settings";

const settingStore = useSettingStore();
</script>

<template>
  <div class="app-setting">
    <h3>系统布局配置</h3>
    <div class="drawer-item">
      <span>显示标签栏</span>
      <el-switch
        v-model="settingStore.showTagsView"
        active-color="teal"
      ></el-switch>
    </div>
    <div class="drawer-item">
      <span>显示全屏</span>
      <el-switch
        v-model="settingStore.showScreenfull"
        active-color="teal"
      ></el-switch>
    </div>
    <div class="drawer-item">
      <span>显示消息通知</span>
      <el-switch
        v-model="settingStore.showNotify"
        active-color="teal"
      ></el-switch>
    </div>
    <div class="drawer-item">
      <span>......</span>
    </div>
    <div class="drawer-item">
      <span>......</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-setting {
  color: teal;
  h3 {
    padding-bottom: 30px;
  }
  .drawer-item {
    color: #222222;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    span {
      vertical-align: middle;
      padding-right: 20px;
      display: inline-block;
    }
  }
}
</style>
