<script lang="ts" setup>
import { h } from "vue";
import { ElNotification } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

/*
 * Element Plus 组件 默认 使用英语
 * 将 Element Plus 设置为中文
 */
const locale = zhCn;

/* 一个问候弹出框 */
ElNotification({
  title: "你好",
  message: h(
    "a",
    { style: "color:teal", target: "_blink", href: "" },
    "欢迎来到 vue3 + vite + ElementPlus + pinia"
  ),
  duration: 0,
  position: "top-right",
});
</script>

<template>
  <!-- Element Plus 提供了一个 Vue 组件 ConfigProvider 用于全局配置国际化的设置 -->
  <ElConfigProvider :locale="locale"></ElConfigProvider>
</template>

<style scoped></style>
