<script lang="ts" setup>
import { useSettingStore } from "@/store/modules/settings";

const settingStore = useSettingStore();
</script>

<template>
  <div class="app-setting">
    <div class="title">
      <svg-icon name="vite" font-size="32"></svg-icon>
      <span>系统布局配置</span>
    </div>
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
  padding: 20px;
  .title {
    padding-bottom: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    span {
      padding-left: 20px;
    }
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
