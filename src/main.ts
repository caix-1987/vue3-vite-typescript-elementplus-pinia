import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";

// load
import { loadPlugins } from "@/plugins";

// css
import "element-plus/dist/index.css";

const app = createApp(App);

/* 加载插件 */
loadPlugins(app);

app.use(router).mount("#app");
