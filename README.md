##### 一、创建项目

```
1、npm

  npm init vite@latest  project-name

  npm init vite@latest project-name --template vue-ts

2、yarn

  yarn  create vite@latest  project-name

  yarn  create vite project-name --template vue-ts
```

##### 二、vsCode 开发工具配置

###### 1、添加基础插件并一键下载

```
在 .vscode 文件夹下修改 extensions.json 文件 内容如下

{
  "recommendations": [
    "editorconfig.editorconfig",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "vue.vscode-typescript-vue-plugin",
    "vue.volar",
    "antfu.unocss",
    "zixuanchen.vitest-explorer",
    "wiensss.region-highlighter"
  ]
}

插件一键下载

  1、进入 vscode 的插件视图

  2、输入框位置输入 @recommended ；

  3、点击下载按钮一键安装
```

###### 2、Vue3 Hook 代码结构一键生成

```
在 .vscode 文件夹下添加文件 hook.code-snippets 并添加内容

{
  "Vue3 Hook 代码结构一键生成": {
    "prefix": "Vue3 Hook",
    "body": [
      "import { ref } from \"vue\"\n",
      "const refName1 = ref<string>(\"这是一个响应式变量\")\n",
      "export function useHookName() {",
      "\tconst refName2 = ref<string>(\"这是一个响应式变量\")\n",
      "\tconst fnName = () => {}\n",
      "\treturn { refName1, refName2, fnName }",
      "}",
      "$1"
    ],
    "description": "Vue3 Hook"
  }
}
```

###### 3、Vue3 SFC 代码结构一键生成

```
在 .vscode 文件夹下添加文件 vue.code-snippets 并添加内容

{
  "Vue3 SFC 代码结构一键生成": {
    "prefix": "Vue3 SFC",
    "body": [
      "<script lang=\"ts\" setup></script>\n",
      "<template>",
      "\t<div class=\"app-container\">...</div>",
      "</template>\n",
      "<style scoped></style>",
      "$1"
    ],
    "description": "Vue3 SFC"
  }
}
```

##### 三、集成配置

```
1、vite.config.ts

  我们按照上面步骤创建完项目会发现根目录下有个 vite.config.ts 文件，其实就相当于@vue-cli 项目中的 vue.config.js 文件

2、tsconfig.json

  在根目录下会有一个 tsconfig.json 文件，tsconfig.json 文件是 TypeScript 编译器的配置文件，TypeScript 编译器可以根据它的规则来对代码进行编译
```

```
3、为保证 node 的使用

yarn add @types/node --save-dev
```

```
4、配置别名 @

 1、vite.config.ts

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

const resolve = (dir: string) => path.resolve(__dirname, dir); // 配置别名 @
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
});

 2、tsconfig.json

{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "skipLibCheck": true,
    "noEmit": true,
    /* baseUrl 用来告诉编译器到哪里去查找模块，使用非相对模块时必须配置此项 */
    "baseUrl": ".",
    /** 非相对模块导入的路径映射配置，根据 baseUrl 配置进行路径计算 */
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

###### vite.config.ts 示例

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import path from 'path';

const pathResolve = (pathStr:String) => {
  // @ts-ignore
  return path.resolve(__dirname, pathStr);
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // 本地启动的地址
    port: 3000, // 服务端口号
    proxy: { // 代理配置
      '/api/': {
        target: 'http:xxx.xxx.xx.x',
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
  },
  resolve: {
    alias: {
      '@': pathResolve('./src'),
    }
  },
  build: {
    sourcemap: false,
    minify: 'esbuild', // 构建时的压缩方式
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
      }
    }
  }
})
```

###### tsconfig.json 示例

```
{
  "compilerOptions": {
    "target": "ESNext", // 指定ECMAScript的目标版本：'ES3'(默认),'ES5','ES2015','ES2016','ES2017','ES2018','ES2019','ES2020'或者'ESNEXT'
    "useDefineForClassFields": true, // 此标志用作迁移到即将推出的类字段标准版本的一部分，默认：false
    "module": "ESNext", // 指定模块代码生成:'none','commonjs','amd','system','umd','es2015','es2020',或'ESNext'
    "moduleResolution": "Node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入，node或classic
    "strict": true, // 是否启用所有严格的类型检查
    "jsx": "preserve", // 指定 jsx 格式
    "sourceMap": true, // 生成目标文件的sourceMap文件
    "resolveJsonModule": true, // 是否解析 JSON 模块，默认：false
    "isolatedModules": true, // 是否将每个文件转换为单独的模块，默认：false
    "esModuleInterop": true, // 通过为所有导入创建名称空间对象，实现CommonJS和ES模块之间的互操作性
    "allowJs": true, // 允许编译器编译JS，JSX文件
    "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
    "lib": ["ESNext", "DOM"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array"
    "skipLibCheck": true, // 跳过声明文件的类型检查
    // "types": ["element-plus/global"] // 加载的声明文件包
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"], // 指定被编译文件所在目录，** 表示任意目录， * 表示任意文件
  "references": [{ "path": "./tsconfig.node.json" }] // 项目引用，是 TS 3.0 中的一项新功能，它允许将 TS 程序组织成更小的部分
}
```

##### 四、安装和配置 element-plus 和 @element-plus/icons-vue

```
1、安装 element-plus

   yarn add element-plus
```

```
2、引入

  1、main.ts 文件中全局引入

    import { createApp } from 'vue'
    import ElementPlus from 'element-plus'
    import 'element-plus/dist/index.css'
    import App from './App.vue'

    const app = createApp(App)

    app.use(ElementPlus)
    app.mount('#app')

  2、按需引入 【 推荐 】

    1、element-plus 官方 推出了自动导入，我们需要安装两款插件

       1、unplugin-vue-components

       2、unplugin-auto-import

       yarn add -D unplugin-vue-components unplugin-auto-import

    2、装好之后再回到 vite.config.ts 文件中

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
}

   这样我们就可以直接在项目中直接使用 element-plus 的组件了
```

```
3、本项目以插件形式全局引入

在 src 下新建 plugins 文件夹；在该文件夹下新建 element-plus 和 element-plus-icon 两个文件夹 和 index.ts 文件，各文件内容如下
```

```
1、src/plugins/index.ts

import { type App } from "vue";
import { loadElementPlus } from "./element-plus";
/* 使用 ElementPlus 的图标库，首先要先安装官方提供的图标库包，因为它并不在 ElementPlus 的包中 */
import { loadElementPlusIcon } from "./element-plus-icon";

export function loadPlugins(app: App) {
  loadElementPlus(app);
  loadElementPlusIcon(app);
}

2、src/plugins/element-plus/index.ts

import { type App } from "vue";
import ElementPlus from "element-plus";

export function loadElementPlus(app: App) {
  /* Element plus 组件完整引入 */
  app.use(ElementPlus);
}

3、src/plugins/element-plus-icon/index.ts

import { type App } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

export function loadElementPlusIcon(app: App) {
  /* 注册所有 Element Plus Icon */
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
}

4、在 main.ts 以插件形式引入

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
```

```
4、element-plus 的 icon 使用需要安装 element-plus/icons-vue

   yarn add @element-plus/icons-vue

   1、在页面中按需引入

    import { Edit } from "@element-plus/icons-vue"

   2、也可以全局引入

import { type App } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

export function loadElementPlusIcon(app: App) {
  /* 注册所有 Element Plus Icon */
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
}

详细参看实际项目 https://github.com/caix-1987/vue3-vite-typescript-elementplus-pinia
```

```
5、将 Element Plus 设置为中文

   Element Plus 组件 默认 使用英语

<script lang="ts" setup>
import { h } from "vue";
import { ElNotification } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

/*
 * Element Plus 组件 默认 使用英语
 * 将 Element Plus 设置为中文
 */
const locale = zhCn;

/* 一个问候弹出框 */
ElNotification({
  title: "你好",
  message: h(
    "a",
    { style: "color:teal", target: "_blink", href: "" },
    "欢迎来到 vue3 + vite + ElementPlus + pinia"
  ),
  duration: 0,
  position: "top-right",
});
</script>

<template>
  <!-- Element Plus 提供了一个 Vue 组件 ConfigProvider 用于全局配置国际化的设置 -->
  <ElConfigProvider :locale="locale"></ElConfigProvider>
</template>

<style scoped></style>
```

##### 五、配置环境变量

```
1、添加环境变量文件

  1、.env.development 【 开发环境 】

  2、.env.production  【 生产环境 】

文件代码示例

# 请勿改动这一项，该项也不可以通过 import.meta.env.NODE_ENV 调用
NODE_ENV = development

# 下面是自定义的环境变量，可以修改（命名必须以 VITE_ 开头）

## 后端接口公共路径（如果解决跨域问题采用反向代理就只需写公共路径）
VITE_BASE_API = '/api/v1'

## 路由模式 hash 或 html5
VITE_ROUTER_HISTORY = 'hash'

## 开发环境地址前缀（一般 '/'，'./' 都可以）
VITE_PUBLIC_PATH = '/'
```

```
2、vite.config.ts 配置环境变量

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

const resolve = (dir: string) => path.resolve(__dirname, dir); // 配置别名 @

export default ({ mode }) => {
  /* 获取环境变量 */
  const VITE_APP_SERVER_URL: string = loadEnv(
    mode,
    process.cwd()
  ).VITE_APP_SERVER_URL;

  return defineConfig({
    /* 打包时根据实际情况修改 base */
    base: VITE_APP_SERVER_URL,
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        "@": resolve("src"),
      },
    },
    /* vite 插件 */
    plugins: [vue()],
  });
};
```

```
3、package.json 文件添加环境打包配置

  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "build:prod": "vue-tsc --noEmit && vite build",
    "preview": "vite preview"
   },
```

##### 六、安装和配置 Vue-router

```
1、安装 vue-router

yarn add vue-router --save
```

```
2、添加 router 配置文件 inde.ts

import {
  type RouteRecordRaw,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const layout = () => import("@/views/layout/index.vue");

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/home/index.vue"),
        name: "Home",
        meta: {
          title: "首页",
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: { hidden: true },
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: { hidden: true },
  },
];

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === "hash"
      ? createWebHashHistory(import.meta.env.VITE_ROUTER_HISTORY)
      : createWebHistory(import.meta.env.VITE_ROUTER_HISTORY),
  routes: routes,
});

export default router;
```

```
3、在 main.ts 里引入 router

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
```

```
4、APP.vue 里写入 router-view 组件接收路由视图

<script lang="ts" setup>
import { h } from "vue";
import { ElNotification } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

/*
 * Element Plus 组件 默认 使用英语
 * 将 Element Plus 设置为中文
 */
const locale = zhCn;

/* 一个问候弹出框 */
ElNotification({
  title: "你好",
  message: h(
    "a",
    { style: "color:teal", target: "_blink", href: "" },
    "欢迎来到 vue3 + vite + ElementPlus + pinia"
  ),
  duration: 0,
  position: "top-right",
});
</script>

<template>
  <!-- Element Plus 提供了一个 Vue 组件 ConfigProvider 用于全局配置国际化的设置 -->
  <ElConfigProvider :locale="locale">
    <router-view></router-view>
  </ElConfigProvider>
</template>

<style scoped></style>
```

##### 七、安装并使用 sass

```
1、安装

  yarn add sass --save
```

```
2、基本使用

```

##### 八、安装和配置使用 Pinia

###### 1、安装

```
  yarn add pinia --save
```

###### 2、配置

```
1、创建 store 文件夹 添加 index.ts 文件

  import { createPinia } from "pinia";

  const store = createPinia();

  export default store;
```

```
2、创建 modules 文件夹 添加模块文件 如 tags.ts

import { ref } from "vue";
import { defineStore } from "pinia";
/* RouteLocationNormalized：表示当前路由记录实例 */
import { RouteLocationNormalized } from "vue-router";
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
```

```
3、在 main 中引入

import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

/* vite 使用 import.meta.env 获取环境变量 */
console.log("环境变量", import.meta.env);

// load
import { loadPlugins } from "@/plugins";

// css
import "element-plus/dist/index.css";
import "@/styles/index.scss";

const app = createApp(App);

/* 加载插件 */
loadPlugins(app);

app.use(store).use(router).mount("#app");
```

###### 3、使用

```
/* 引入 useTagsViewStore */
import { type ITagView, useTagsViewStore } from "@/store/modules/tags";
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";

const route = useRoute();
const routes = useRouter();

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

/* 使用 useTagsViewStore */
const addTags = () => {
  if (route?.meta.title) {
    tagsStore.addTag(route);
  }
};

/* 使用 useTagsViewStore */
const delTag = (view: ITagView) => {
  tagsStore.delTag(view);
  console.log("tagsStore.tagList", tagsStore.tagList.length);
  if (!tagsStore.tagList.length) {
    routes.push("/");
  }
};
```

##### 九、安装 vite-plugin-svg-icons 和 vite-svg-loader 使用 Svg 图标

###### 1、安装 vite-svg-loader 和 vite-plugin-svg-icons

```
说明

 1、vite-plugin-svg-icons: 使用 svg 的核心插件

   补充 svg-sprite-loader 非 vite 版本

 2、vite-svg-loader: 将 SVG 静态图转化为 Vue 组件

安装

 yarn add vite-plugin-svg-icons --save

 yarn add vite-svg-loader --save

注意

 如果提示 Error: Cannot find module 'fast-glob'

 记得安装 fast-glob

 yarn add fast-glob -D
```

###### 2、vite-config.js 中配置

```
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
/* 使用 Svg 图标插件 */
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
/* 将 Svg 静态图转为 Vue 组件 */
import svgLoader from "vite-svg-loader";

const resolve = (dir: string) => path.resolve(__dirname, dir); // 配置别名 @

export default ({ mode }) => {
  /* 获取环境变量 */
  const VITE_APP_SERVER_URL: string = loadEnv(
    mode,
    process.cwd()
  ).VITE_APP_SERVER_URL;

  return defineConfig({
    /* 打包时根据实际情况修改 base */
    base: VITE_APP_SERVER_URL,
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        "@": resolve("src"),
      },
    },
    /* vite 插件 */
    plugins: [
      vue(),
      /* 将 Svg 静态图转为 Vue 组件 */
      svgLoader(),
      /* 使用 Svg 的插件配置 */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/svg")], // 图标地址
        symbolId: "icon-[dir]-[name]",
      }),
    ],
  });
};
```

###### 3、下载 svg 图标放入 src/assets/svg 目录

```
下载地址

  https://www.iconfont.cn/
```

###### 4、封装 svg 通用组件

```
/src/components/SvgIcon 下新建文件

index.vue  组件模版

index.ts   组件挂载配置
```

```
1、index.vue

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href="symbolId"></use>
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
```

```
2、index.ts

import { type App } from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
/* 倒入 Svg 图片插件 可以在页面上显示 Svg 图片 */
import "virtual:svg-icons-register";

export function loadSvg(app: App) {
  app.component("SvgIcon", SvgIcon);
}
```

###### 5、在 main 中全局引入封住好的组件

```
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
import "@/styles/index.scss";

const app = createApp(App);

/* 加载插件 */
loadPlugins(app);
/* 加载全局 SVG */
loadSvg(app);

app.use(router).use(store).mount("#app");
```

###### 6、使用 Svg 组件加载 Svg 图标

```
 <svg-icon :name="item?.meta?.icon" class="mr"></svg-icon>

  <svg-icon name="vite" font-size="32"></svg-icon>
```

###### 7、补充：可以使用插件，将 svg 图片直接转化为 vue 组件

```
vite-svg-loader 插件提供的的功能

<script lang="ts" setup>
import Svg404 from "@/assets/error-page/404.svg?component"
</script>

<template>
  <Svg404 />
</template>
```

##### 十、全屏功能 screenfull

```
1、全屏的相关解决方案参看

 https://juejin.cn/post/7109268961161642021

2、本项目采用插件 "screenfull": "^6.0.2" 实现
```

###### 1、安装 screenfull

```
yarn add screenfull --save
```

###### 2、组件代码逻辑开发

```
<script lang="ts" setup>
import { ref, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
import screenfull from "screenfull";

const props = defineProps({
  element: {
    type: String,
    default: "html",
  },
  openTips: {
    type: String,
    default: "全屏",
  },
  closeTips: {
    type: String,
    default: "退出全屏",
  },
});

const tips = ref<string>(props.openTips);
const isFullscreen = ref<boolean>(false);

const click = () => {
  const dom = document.querySelector(props.element) || undefined;
  if (!screenfull.isEnabled) {
    ElMessage.warning("您的浏览器不支持全屏");
    return;
  }
  screenfull.toggle(dom);
};

const change = () => {
  isFullscreen.value = screenfull.isFullscreen;
  tips.value = screenfull.isFullscreen ? props.closeTips : props.openTips;
};

screenfull.on("change", change);

onUnmounted(() => {
  if (screenfull.isEnabled) {
    screenfull.off("change", change);
  }
});
</script>

<template>
  <div class="app-fullScreen" @click="click">
    <el-tooltip effect="dark" content="全屏" placement="bottom">
      <el-icon class="icon"></el-icon>
    </el-tooltip>
  </div>
</template>
```

###### 3、screenfull 插件使用说明

```
screenfull 对各种浏览器全屏的 API 进行封装，以便于我们可以方便的使页面或者元素切换到全屏状态

screenfull 有如下常用的 API:

.request(element, options?) 使元素或者页面切换到全屏；

.exit() 退出全屏；

.toggle(element, options?) 在全屏和非全屏之间切换；

.on(event, function) 监听全屏切换或者错误事件；

.off(event, function) 移除之前注册的事件监听；

.isFullscreen 现在是否为全屏；

.isEnabled 浏览器是否允许全屏。
```

##### 十一、多主题 Theme 配置

###### 1、主题加载 hook 逻辑

```
查看 src/hooks/setTheme.ts
```

###### 2、组件切换主题逻辑

```
查看 src/components/Theme.vue
```

###### 3、配置 style 主题样式文件

```
添加主题样式文件 src/styles/theme
```

###### 4、main 引入文件

```
// css
import "element-plus/dist/index.css";

/* element-plus 暗黑主题 */
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/index.scss";
```

###### 5、App.vue 初始化主题

```
import { h } from "vue";
import { useTheme } from "@/hooks/setTheme";
import { ElNotification } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

const { initTheme } = useTheme();

/* 初始化主题 */
initTheme();
```

##### 十二、 侧边栏 menu 配置

```
重点注意 menu 高度 100

.el-menu {
  border: none;
  width: 100% !important;
  height: 100%;
}
```

##### 十三、Element 表格实现 CRUD

###### 1、封装 Axios

```
1、下载安装 axios 和 lodash-es

  yarn add axios --save

2、新建 src/utils/service.ts 文件

  1、引入 axios 和 lodash-es 的 get 函数

   import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

   import { get } from "lodash-es";

  2、创建请求实例

    1、创建一个 Axios 实例

      const service = axios.create();

    2、请求拦截

      service.interceptors.request.use()

    3、响应拦截

      service.interceptors.response.use()

  3、创建请求方法接收上一步请求实例作为参数

      function createRequestFunction(service: AxiosInstance){}

   4、导出用于网络请求的实例

     export const service = createService();

   5、导出用于网络请求的方法

     export const request = createRequestFunction(service);
```

###### 2、封装 增、删、改、查接口请求方法

```
1、新建 src/api/table 文件夹

  1、src/api/table/types/table.ts

    约定数据类型接口 interface

  2、src/api/table/index.ts

    增、删、改、查请求方法
```

###### 3、组件逻辑样式开发

```
src/views/table-page/table-one-page.vue
```

###### 4、补充 lodash-es 中的 get() 方法

```
1、lodash-es

  lodash 提供了很多可用的方法供我们使用，绝对是一个很好用且用起来得心应手的工具库

  lodash-es 是具备 ES6 模块化的版本，只需要直接引入就可以

2、lodash-es 中的 get 函数

 get函数 可以在对象中获得深度嵌套的属性，而无需担心中间属性是否是 null 或者 undefined

 get函数 可以安全地访问嵌套 location.geometry.type 属性，而不必明确检查是否 landmark, landmark.location，或者 landmark.location.geometry 未定义
```

###### 5、vite.config.ts server 配置说明

```
  server: {
      /* 是否开启 https */
      https: false,
      /* 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true,
      /* 端口号 */
      port: 5173,
      /* 是否自动打开浏览器 */
      open: false,
      /* 跨域设置允许 */
      cors: true,
      /* 端口被占用 是否直接退出 */
      strictPort: false,
      /* 代理接口 */
      proxy: {
        "/api/v1": {
          target:
           "目标地址",
          ws: true,
          /* 是否允许跨域 */
          changeOrigin: true,
          rewrite: (path) => path.replace("/api/v1", ""),
        },
      },
    },
```

##### 十四、mock 安装配置及使用

###### 1、安装

```
需要安装两个文件

  1、mockjs

  2、vite-plugin-mock

yarn add mockjs vite-plugin-mock --save-dev
```

###### 2、配置

```
vite.config.ts 中配置

plugins: [
      vue(),
      /* 将 Svg 静态图转为 Vue 组件 */
      svgLoader(),
      /* 使用 Svg 的插件配置 */ /* 记得安装 fast-glob 不然会提示 Error: Cannot find module 'fast-glob' */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/svg")], // 图标地址
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        /* mock 的文件路径 */
        mockPath: "src/mock",
        /* 开发环境 */
        localEnabled: true,
      }),
    ],
```

###### 3、新建 mock 文件

```
src/mock/index.ts

import { MockMethod } from "vite-plugin-mock";

const mock: Array<MockMethod> = [
  {
    url: "/api/v1/table",
    method: "get",
    response: () => {
      return {
        code: 0,
        message: "ok",
        "data|20": [
          {
            "id|+1": "0",
            username: "@cname",
            createTime: "@date(yyyy-MM-DD)",
            email: "@email()",
            "phone|1": ["1398779792", "13987737892", "15008885522"],
            "roles|1": ["admin", "guest"],
            status: Boolean,
          },
        ],
      };
    },
  },
];

export default mock;
```

###### 4、使用

```
配置好的 mock 会自动拦截 axios 请求，前提是 mock 里配置好对应的 url 请求方法

const getTableData = () => {
  getTableDataApi({
    currentPage: paginationData.currentPage,
    size: paginationData.pageSize,
    username: "",
    phone: "",
  })
    .then((res) => {
      tableData.value = res.data;
      console.log("res111", res);
    })
    .catch((e) => {
      console.log("eeee", e);
    })
    .finally(() => {
      console.log("finally");
    });
};

mockjs 语法

https://www.cnblogs.com/jie-fang/p/13555460.html

示例

"id":"@id"

"star|1-2":"⭐"  字符串重复1-2次

"price|100-200.2-3”小数点2-3位

"data | 10"";[{name:"名称")]数组的内容重复10遍

"live | 1":true,随机返回true,false

"tel":/13\d{9}/  手机号码

"des":function(){ return

this.start+this.price}

"name":"@cname" 表示中文名称

"address":"@country(true)" 地址

"description":"@cparagraph(1，3）”随机段落2-3行

"pic":@datalmage(200x100）;图示"
```
