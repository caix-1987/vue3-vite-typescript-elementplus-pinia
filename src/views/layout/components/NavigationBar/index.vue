<script lang="ts" setup>
import {
  FullScreen,
  Notify,
  UserInfo,
  Theme,
  BreadCrumb,
  Fold,
} from "@/components";
import { computed } from "vue";
import { useSettingStore } from "@/store/modules/settings";
import { useSidebarStore } from "@/store/modules/sidebar";

const settingStore = useSettingStore();

const showNotify = computed(() => {
  return settingStore.showNotify;
});

const showFullScreen = computed(() => {
  return settingStore.showScreenfull;
});
</script>

<template>
  <div class="app-navigationBar">
    <div class="left">
      <Fold />
      <BreadCrumb />
    </div>
    <div class="right">
      <FullScreen v-if="showFullScreen" />
      <Theme />
      <Notify v-if="showNotify" />
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
