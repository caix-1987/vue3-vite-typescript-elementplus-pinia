<script lang="ts" setup>
import {
  NavigationBar,
  SideBar,
  TagList,
  Container,
  SetingButton,
  Seting,
} from "./components";
import { watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useTagsViewStore } from "@/store/modules/tags";
import { useSettingStore } from "@/store/modules/settings";

const route = useRoute();
const tagsStore = useTagsViewStore();
const settingStore = useSettingStore();

const addTag = () => {
  if (route?.meta?.title) {
    tagsStore.addTag(route);
  }
};

watch(
  route,
  () => {
    addTag();
  },
  {
    deep: true,
    immediate: true,
  }
);

const showTagsView = computed(() => {
  return settingStore.showTagsView;
});
</script>

<template>
  <div class="app-layout">
    <SideBar class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <NavigationBar />
        <TagList v-if="showTagsView" />
      </div>
      <Container />
      <SetingButton>
        <Seting />
      </SetingButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  position: relative;
  width: 100%;
}
.sidebar-container {
  transition: width 0.28s;
  width: var(--caix-sidebar-width) !important;
  position: fixed;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  background: var(--caix-sidebar-bg-color);
}
.main-container {
  min-height: 100%;
  transition: width 0.28s;
  position: relative;
  margin-left: var(--caix-sidebar-width);
}
.fixed-header {
  position: fixed;
  width: 100%;
  top: 0;
  right: 0;
  width: calc(100% - var(--caix-sidebar-width));
  transition: width 0.28s;
  z-index: 9;
}
</style>
