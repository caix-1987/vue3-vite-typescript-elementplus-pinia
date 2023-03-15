import { type App } from "vue";
import ElementPlus from "element-plus";

export function loadElementPlus(app: App) {
  /* Element plus 组件完整引入 */
  app.use(ElementPlus);
}
