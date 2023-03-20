import { reactive } from "vue";
import { defineStore } from "pinia";

interface Isidebar {
  opened: boolean;
  withoutAnimation: boolean;
}

export const useSidebarStore = defineStore("sidebar", () => {
  const sidebar: Isidebar = reactive({
    opened: false,
    withoutAnimation: false,
  });

  const toggleSidebar = () => {
    sidebar.opened = !sidebar.opened;
  };

  const closeSidebar = () => {
    sidebar.opened = false;
  };

  return { sidebar, toggleSidebar, closeSidebar };
});
