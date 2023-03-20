<script lang="ts" setup>
import { useRoute, useRouter, type RouteLocationMatched } from "vue-router";
import { ref, watch } from "vue";

const route = useRoute();
const router = useRouter();
const breadcrumbs = ref<RouteLocationMatched[]>([]);

const getBreadcrumb = () => {
  breadcrumbs.value = route.matched.filter((item) => {
    return item.meta && item.meta.title;
  });
};

watch(
  () => route.path,
  () => {
    getBreadcrumb();
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="app-breadCrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
        <span
          class="main-title"
          v-if="item.redirect"
          @click="router.push(`${item.path}`)"
          >{{ item.meta.title }}</span
        >
        <span class="sub-title" v-else>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
.main-title {
  color: #fffff0;
  font-size: 14px;
  cursor: pointer;
}
.main-title:hover {
  color: #409eff;
}
.sub-title {
  font-size: 14px;
}
</style>
