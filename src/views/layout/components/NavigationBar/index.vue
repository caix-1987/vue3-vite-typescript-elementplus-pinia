<script lang="ts" setup>
import { FullScreen, Notify, UserInfo, Theme } from "@/components";
</script>

<template>
  <div class="app-navigationBar">
    <div class="left">
      <el-icon :size="24" class="icon">
        <Fold v-if="true" />
        <Expand v-else />
      </el-icon>
      <div class="tag-name">tag-name</div>
    </div>
    <div class="right">
      <FullScreen />
      <Theme />
      <Notify />
      <UserInfo />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-navigationBar {
  background: var(--caix-navigationBar-bg-color);
  color: var(--caix-font-color-white);
  height: var(--caix-navigationBar-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;

  .left {
    display: flex;
    align-items: center;
    .icon {
      cursor: pointer;
    }
    .tag-name {
      padding-left: 30px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    padding-right: 20px;
  }
}
</style>
