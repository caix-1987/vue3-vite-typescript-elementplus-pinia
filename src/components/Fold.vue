<script lang="ts" setup></script>

<template>
  <div class="app-fold">
    <el-icon :size="24" class="icon">
      <Fold v-if="true" />
      <Expand v-else />
    </el-icon>
  </div>
</template>

<style lang="scss" scoped>
.app-fold {
  padding-right: 30px;
}
.icon {
  cursor: pointer;
  vertical-align: middle;
}
</style>
