<script lang="ts" setup></script>

<template>
  <div class="app-notify">
    <el-badge value="10" :max="10" :hidden="false">
      <el-tooltip effect="dark" content="消息通知" placement="bottom">
        <el-icon class="icon">
          <Bell />
        </el-icon>
      </el-tooltip>
    </el-badge>
  </div>
</template>

<style lang="scss" scoped>
.app-notify {
  margin-right: 50px;
  cursor: pointer;
  .icon {
    color: #ffffff;
    vertical-align: middle;
    font-size: 24px;
  }
}
</style>
