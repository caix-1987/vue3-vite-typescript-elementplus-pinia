<script lang="ts" setup>
import { computed } from "vue";
import { useSidebarStore } from "@/store/modules/sidebar";

const setSidebar = useSidebarStore();
const isOpen = computed(() => {
  return !setSidebar.sidebar.opened;
});

const click = () => {
  setSidebar.toggleSidebar();
};
</script>

<template>
  <div class="app-fold" @click="click">
    <el-icon :size="24" class="icon">
      <Fold v-if="isOpen" />
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
