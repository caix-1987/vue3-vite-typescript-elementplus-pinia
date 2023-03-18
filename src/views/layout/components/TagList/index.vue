<script lang="ts" setup>
/* 引入 useTagsViewStore */
import { type ITagView, useTagsViewStore } from "@/store/modules/tags";
import { useRoute, useRouter } from "vue-router";
import { watch, ref } from "vue";

const route = useRoute();
const routes = useRouter();
const closable = ref<boolean>(true);

/* 赋值 useTagsViewStore*/
const tagsStore = useTagsViewStore();

watch(
  route,
  () => {
    addTags();
  },
  {
    deep: true,
  }
);
watch(
  tagsStore.tagList,
  (n) => {
    if (!tagsStore.tagList.length) {
      routes.push("/");
    }
    if (n.length === 1 && n[0].path === "/home") {
      closable.value = false;
    } else {
      closable.value = true;
    }
  },
  {
    immediate: true,
  }
);

/* 使用 useTagsViewStore */
const addTags = () => {
  if (route?.meta.title) {
    tagsStore.addTag(route);
  }
};

/* 使用 useTagsViewStore */
const delTag = (view: ITagView) => {
  tagsStore.delTag(view);
  if (view.path === route.path && tagsStore.tagList.length) {
    routes.push(`${tagsStore.tagList[tagsStore.tagList.length - 1].path}`);
  }
};

const goRoute = (view: ITagView) => {
  routes.push(`${view.path}`);
};
</script>

<template>
  <div class="app-tagList">
    <el-scrollbar>
      <div class="scrollbar-flex-content">
        <el-tag
          :closable="closable"
          v-for="item in tagsStore.tagList"
          :key="item.path"
          class="scrollbar-demo-item"
          @close="delTag(item)"
          @click="goRoute(item)"
          :type="item.path === route.path ? 'success' : 'info'"
        >
          {{ item?.meta?.title }}
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
    cursor: pointer;
  }
  .scrollbar-demo-item {
    flex-shrink: 0;
    margin-right: 10px;
  }
}
</style>
