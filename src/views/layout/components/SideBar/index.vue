<script lang="ts" setup>
import { useRouter, useRoute, type RouteRecordRaw } from "vue-router";
import { computed, ref } from "vue";
import { useSidebarStore } from "@/store/modules/sidebar";
import { getCssVariableValue } from "@/utils";

const setSidebar = useSidebarStore();
const opens = ref(["/table"]);
const isOpen = computed(() => {
  return setSidebar.sidebar.opened;
});
const routes = useRouter().options.routes;
const route = useRoute();

const v3SidebarMenuBgColor = getCssVariableValue(
  "--caix-sidebar-menu-bg-color"
);
const v3SidebarMenuTextColor = getCssVariableValue(
  "--caix-sidebar-menu-text-color"
);
const v3SidebarMenuActiveTextColor = getCssVariableValue(
  "--caix-sidebar-menu-active-text-color"
);
</script>

<template>
  <div class="app-sideBar">
    <header class="sideBarHeader">
      <svg-icon name="vite" font-size="32"></svg-icon>
      <transition name="fade-transform" mode="out-in">
        <span v-if="!isOpen">caix_管理系统</span>
      </transition>
    </header>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        router
        :background-color="v3SidebarMenuBgColor"
        :text-color="v3SidebarMenuTextColor"
        :active-text-color="v3SidebarMenuActiveTextColor"
        :default-active="route.path"
        :unique-opened="true"
        :collapse="isOpen"
        :collapse-transition="false"
        :default-openeds="opens"
      >
        <template v-for="item in routes" :key="item.path">
          <el-sub-menu
            :index="item.path"
            v-if="item?.children && item?.children.length > 1"
          >
            <template #title v-if="item?.meta?.isShowSideBar">
              <el-icon> <component :is="item?.meta?.icon" /></el-icon>
              <span>{{ item?.meta?.title }}</span>
            </template>
            <el-menu-item
              :index="ele.path"
              v-for="ele in item.children"
              :key="ele.path"
            >
              {{ ele?.meta?.title }}</el-menu-item
            >
          </el-sub-menu>
          <el-menu-item
            v-else-if="item?.meta?.isShowSideBar"
            :index="item.path"
          >
            <el-icon>
              <component :is="item.meta.icon" />
            </el-icon>
            <template #title>
              {{ item?.meta?.title }}
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.app-sideBar {
  color: var(--caix-font-color-white);
  width: 100%;
}
.sideBarHeader {
  height: var(--caix-navigationBar-height);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  background: var(--caix-navigationBar-bg-color);
  width: 100%;
  span {
    padding-left: 10px;
    font-size: 18px;
    font-weight: 900;
  }
}

.el-scrollbar {
  height: 100%;
  :deep(.scrollbar-wrapper) {
    // 限制水平宽度
    overflow-x: hidden !important;
    .el-scrollbar__view {
      height: 100%;
    }
  }
  // 滚动条
  :deep(.el-scrollbar__bar) {
    &.is-horizontal {
      // 隐藏水平滚动条
      display: none;
    }
  }
}

@mixin tip-line {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background-color: var(--caix-sidebar-menu-tip-line-bg-color);
  }
}
.el-menu {
  border: none;
  width: 100% !important;
  height: 100%;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item) {
  height: var(--caix-sidebar-menu-item-height);
  line-height: var(--caix-sidebar-menu-item-height);
  &.is-active,
  &:hover {
    background-color: var(--caix-sidebar-menu-hover-bg-color);
  }
  display: block;
  * {
    vertical-align: middle;
  }
}

:deep(.el-menu-item) {
  &.is-active {
    @include tip-line;
  }
}

.el-menu--collapse {
  :deep(.el-sub-menu) {
    &.is-active {
      .el-sub-menu__title {
        color: var(--caix-sidebar-menu-active-text-color) !important;
        @include tip-line;
      }
    }
  }
}
</style>
