<script lang="ts" setup>
import { useRouter, useRoute, type RouteRecordRaw } from "vue-router";
import { computed } from "vue";
const routes = useRouter().options.routes;
const route = useRoute();
console.log("router", routes);
</script>

<template>
  <div class="app-sideBar">
    <header class="sideBarHeader">
      <img src="@/assets/vite.svg" class="logo" alt="Vite logo" />
      <span>caix - 1987</span>
    </header>
    <el-menu
      router
      background-color="#001428"
      text-color="#ffffff"
      popper-effect="light"
      :default-active="route.path"
    >
      <template v-for="item in routes" :key="item.path">
        <el-sub-menu
          :index="item.path"
          v-if="item?.children && item?.children.length > 1"
        >
          <template #title v-if="item?.meta?.isShowSideBar">
            <span>{{ item?.meta?.title }}</span>
          </template>
          <el-menu-item
            :index="ele.path"
            v-for="ele in item.children"
            :key="ele.path"
            >{{ ele?.meta?.title }}</el-menu-item
          >
        </el-sub-menu>
        <el-menu-item
          v-else-if="item?.meta?.isShowSideBar"
          :index="item.path"
          >{{ item?.meta?.title }}</el-menu-item
        >
      </template>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.app-sideBar {
  color: var(--caix-font-color-white);
}
.sideBarHeader {
  height: var(--caix-navigationBar-height);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--caix-navigationBar-bg-color);
  span {
    padding-left: 10px;
    font-size: 18px;
    font-weight: 900;
  }
}
</style>
