import { type App } from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
/* 倒入 Svg 图片插件 可以在页面上显示 Svg 图片 */
import "virtual:svg-icons-register";

export function loadSvg(app: App) {
  app.component("SvgIcon", SvgIcon);
}
