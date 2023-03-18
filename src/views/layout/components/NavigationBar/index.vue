<script lang="ts" setup>
import {
  FullScreen,
  Notify,
  UserInfo,
  Theme,
  BreadCrumb,
  Fold,
} from "@/components";
</script>

<template>
  <div class="app-navigationBar">
    <div class="left">
      <Fold />
      <BreadCrumb />
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
    justify-content: center;
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
