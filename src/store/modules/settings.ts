import { ref } from "vue";
import { defineStore } from "pinia";
import layoutSettings from "@/config/layoutConfig";

export const useSettingStore = defineStore("settings", () => {
  const showScreenfull = ref<boolean>(layoutSettings.showScreenfull);
  const showNotify = ref<boolean>(layoutSettings.showNotify);
  const showTagsView = ref<boolean>(layoutSettings.showTagsView);

  return {
    showScreenfull,
    showNotify,
    showTagsView,
  };
});
