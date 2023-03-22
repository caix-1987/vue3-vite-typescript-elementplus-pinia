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
import { useSidebarStore } from "@/store/modules/sidebar";

const route = useRoute();
const tagsStore = useTagsViewStore();
const settingStore = useSettingStore();
const setSidebar = useSidebarStore();

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

const isHideSidebar = computed(() => {
  return {
    hideSidebar: setSidebar.sidebar.opened,
    withoutAnimation: setSidebar.sidebar.withoutAnimation,
  };
});
</script>

<template>
  <div class="app-layout" :class="isHideSidebar">
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
@import "@/styles/mixins.scss";
.app-layout {
  @include clearfix;
  position: relative;
  width: 100%;
}
.sidebar-container {
  transition: width 0.28s;
  transition-delay: 0.2s;
  width: var(--caix-sidebar-width) !important;
  position: fixed;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  transition-delay: 0.2s;
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
  transition-delay: 0.2s;
  z-index: 9;
}

.hideSidebar {
  .main-container {
    margin-left: var(--caix-sidebar-hidden-width);
  }
  .sidebar-container {
    width: var(--caix-sidebar-hidden-width) !important;
  }

  .fixed-header {
    width: calc(100% - var(--caix-sidebar-hidden-width));
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
