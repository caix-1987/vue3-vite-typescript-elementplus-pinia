<script lang="ts" setup></script>

<template>
  <div class="app-Theme">
    <el-tooltip effect="dark" content="主题模式" placement="bottom">
      <el-icon class="icon">
        <MagicStick />
      </el-icon>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.app-Theme {
  margin-right: 30px;
  cursor: pointer;
  .icon {
    color: #ffffff;
    vertical-align: middle;
    font-size: 24px;
  }
}
</style>
