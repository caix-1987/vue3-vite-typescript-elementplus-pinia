import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

/* vite 使用 import.meta.env 获取环境变量 */
console.log("环境变量", import.meta.env);

// load
import { loadPlugins } from "@/plugins"; // 主要加载 element 相关
import { loadSvg } from "@/components/SvgIcon/index"; // 加载 svg 相关

// css
import "element-plus/dist/index.css";
/* element-plus 暗黑主题 */
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/index.scss";

const app = createApp(App);

/* 加载插件 */
loadPlugins(app);
/* 加载全局 SVG */
loadSvg(app);

app.use(router).use(store).mount("#app");

router.beforeEach((to, form, next) => {
  const token = localStorage.getItem("token");
  if (to.path === "/login") {
    next();
  } else {
    if (token !== "hasToken") {
      next("/login");
    }
  }
  next();
});
