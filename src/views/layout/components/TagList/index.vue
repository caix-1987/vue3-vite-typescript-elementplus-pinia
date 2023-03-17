<script lang="ts" setup></script>

<template>
  <div class="app-tagList">
    <el-scrollbar>
      <div class="scrollbar-flex-content">
        <el-tag
          closable
          v-for="item in 10"
          :key="item"
          class="scrollbar-demo-item"
        >
          首页
        </el-tag>
      </div>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.app-tagList {
  background: var(--caix-taglist-bg-color);
  box-shadow: 2px 2px 2px 2px #dddddd;
  height: var(--caix-taglist-height);
  padding-left: 10px;
  .scrollbar-flex-content {
    height: var(--caix-taglist-height);
    display: flex;
    align-items: center;
  }
  .scrollbar-demo-item {
    flex-shrink: 0;
    margin-right: 10px;
  }
}
</style>
