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
