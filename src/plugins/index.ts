import { type App } from "vue";
import { loadElementPlus } from "./element-plus";
/* 使用 ElementPlus 的图标库，首先要先安装官方提供的图标库包，因为它并不在 ElementPlus 的包中 */
import { loadElementPlusIcon } from "./element-plus-icon";

export function loadPlugins(app: App) {
  loadElementPlus(app);
  loadElementPlusIcon(app);
}
