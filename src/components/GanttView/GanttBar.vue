<script lang="ts" setup>
import { computed } from "vue";
const props = defineProps({
  progressItem: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
</script>

<template>
  <div>
    <div
      class="caix-1987-progress-bar"
      :class="'caix-1987-gantt-color-' + progressItem.statue"
      :style="{
        marginLeft: progressItem.left,
        marginRight: progressItem.right,
      }"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.caix-1987-progress {
  height: 16px;
  width: 100%;
}
.caix-1987-progress-bar {
  background-color: #42b983;
  height: 16px;
  border-radius: 2px;
  transition: margin-left 1s;
  transition-delay: 1s;
}

.caix-1987-gantt-color-1 {
  // background: #67c23a;
}
.caix-1987-gantt-color-2 {
  // background: #e6a23c;
}
.caix-1987-gantt-color-3 {
  // background: #f5606c;
}
</style>
