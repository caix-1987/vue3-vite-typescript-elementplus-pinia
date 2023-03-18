import { ref } from "vue";
import { defineStore } from "pinia";
/* RouteLocationNormalized：表示当前路由记录实例 */
import { RouteLocationNormalized, useRouter } from "vue-router";
/* Partial 可以快速把某个接口类型中定义的属性变成可选的(Optional)： */
export type ITagView = Partial<RouteLocationNormalized>;
export const useTagsViewStore = defineStore("tags", () => {
  const tagList = ref<ITagView[]>([]);

  const addTag = (view: ITagView) => {
    if (
      tagList.value.some((v, index) => {
        if (v.path === view.path) {
          if (v.fullPath !== view.fullPath) {
            tagList.value[index] = Object.assign({}, view);
          }
          return true;
        }
      })
    ) {
      return;
    }
    tagList.value.push(Object.assign({}, view));
  };

  const delTag = (view: ITagView) => {
    const router = useRouter();
    for (const [i, v] of tagList.value.entries()) {
      if (v.path === view.path) {
        tagList.value.splice(i, 1);
        break;
      }
    }
  };

  return {
    tagList,
    addTag,
    delTag,
  };
});
