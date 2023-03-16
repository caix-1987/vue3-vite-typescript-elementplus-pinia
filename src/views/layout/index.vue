<script lang="ts" setup>
import {
  NavigationBar,
  SideBar,
  TagList,
  Container,
  SetingButton,
} from "./components";
</script>

<template>
  <div class="app-layout">
    <SideBar class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <NavigationBar />
        <TagList />
      </div>
      <Container />
      <SetingButton />
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
  // border-right: solid var(--caix-sidebar-bg-color);
}
.main-container {
  min-height: 100%;
  transition: width 0.28s;
  position: relative;
  margin-left: var(--caix-sidebar-width);
}
</style>
