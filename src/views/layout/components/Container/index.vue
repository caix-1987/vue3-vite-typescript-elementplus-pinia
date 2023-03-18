<script lang="ts" setup></script>

<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  min-height: var(--caix-container-height);
  padding-top: calc(
    var(--caix-navigationBar-height) + var(--caix-taglist-height)
  );
  width: 100%;
  position: relative;
  overflow: hidden;
  background: var(--caix-body-bg-color);
}
</style>
