<script lang="ts" setup></script>

<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  height: 100vh;
  min-height: calc(
    100vh - var(--caix-navigationBar-height) - var(--caix-taglist-height)
  );
  padding-top: calc(
    var(--caix-navigationBar-height) + var(--caix-taglist-height)
  );
  width: 100%;
  position: relative;
  overflow: auto;
  background: var(--caix-body-bg-color);
}
</style>
