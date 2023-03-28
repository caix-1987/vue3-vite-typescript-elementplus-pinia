import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
/* 使用 Svg 图标插件 */
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
/* 将 Svg 静态图转为 Vue 组件 */
import svgLoader from "vite-svg-loader";
import { viteMockServe } from "vite-plugin-mock";

const resolve = (dir: string) => path.resolve(__dirname, dir); // 配置别名 @

export default ({ mode }) => {
  /* 获取环境变量 */
  const VITE_APP_SERVER_URL: string = loadEnv(
    mode,
    process.cwd()
  ).VITE_APP_SERVER_URL;

  return defineConfig({
    /* 打包时根据实际情况修改 base */
    base: "/",
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        "@": resolve("./src"),
      },
    },
    /* vite 插件 */
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
      //proxy: {
      // "/api/v1": {
      // target:
      //  "",
      // ws: true,
      /* 是否允许跨域 */
      //  changeOrigin: true,
      //   rewrite: (path) => path.replace("/api/v1", ""),
      // },
    },
  });
};
