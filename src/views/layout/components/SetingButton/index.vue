<script lang="ts" setup>
import { ref } from "vue";

const show = ref<boolean>(false);
</script>

<template>
  <div class="app-SetingButton" @click="show = true">
    <el-icon size="24"><Setting /></el-icon>
  </div>
  <el-drawer v-model="show" :size="300" :with-header="false">
    <slot />
  </el-drawer>
</template>

<style lang="scss" scoped>
.app-SetingButton {
  position: fixed;
  bottom: 20px;
  right: 0;
  height: 48px;
  width: 48px;
  background: #001428;
  border-radius: 6px 0 0 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}
</style>
