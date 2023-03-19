<script lang="ts" setup>
import { ref, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
import screenfull from "screenfull";

const props = defineProps({
  element: {
    type: String,
    default: "html",
  },
  openTips: {
    type: String,
    default: "全屏",
  },
  closeTips: {
    type: String,
    default: "退出全屏",
  },
});

const tips = ref<string>(props.openTips);
const isFullscreen = ref<boolean>(false);

const click = () => {
  const dom = document.querySelector(props.element) || undefined;
  if (!screenfull.isEnabled) {
    ElMessage.warning("您的浏览器不支持全屏");
    return;
  }
  screenfull.toggle(dom);
};

const change = () => {
  isFullscreen.value = screenfull.isFullscreen;
  tips.value = screenfull.isFullscreen ? props.closeTips : props.openTips;
};

screenfull.on("change", change);

onUnmounted(() => {
  if (screenfull.isEnabled) {
    screenfull.off("change", change);
  }
});
</script>

<template>
  <div class="app-fullScreen" @click="click">
    <el-tooltip effect="dark" :content="tips" placement="bottom">
      <el-icon class="icon">
        <full-screen v-if="!isFullscreen" />
        <Rank v-else />
      </el-icon>
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
