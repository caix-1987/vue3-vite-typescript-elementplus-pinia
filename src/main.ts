import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";

/* vite 使用 import.meta.env 获取环境变量 */
console.log("环境变量", import.meta.env);

// load
import { loadPlugins } from "@/plugins";

// css
import "element-plus/dist/index.css";

const app = createApp(App);

/* 加载插件 */
loadPlugins(app);

app.use(router).mount("#app");
