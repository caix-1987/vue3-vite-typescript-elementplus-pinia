<script lang="ts" setup></script>

<template>
  <div class="app-fullScreen">
    <el-tooltip effect="dark" content="全屏" placement="bottom">
      <el-icon class="icon"><FullScreen /></el-icon>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.app-fullScreen {
  margin-right: 30px;
  cursor: pointer;
  .icon {
    color: #ffffff;
    vertical-align: middle;
    font-size: 24px;
  }
}
</style>
