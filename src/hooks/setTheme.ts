import { ref } from "vue";

const DEFAULT_THEME_NAME = "normal";
type DefaultThemeNameType = typeof DEFAULT_THEME_NAME;

/* 注册主题名称 */

export type ThemeName = DefaultThemeNameType | "dark" | "dark-blue";

interface IThemeList {
  title: string;
  name: ThemeName;
}

/* 主题列表 */
const themeList: IThemeList[] = [
  {
    title: "默认",
    name: DEFAULT_THEME_NAME,
  },
  {
    title: "黑暗",
    name: "dark",
  },
  {
    title: "深蓝",
    name: "dark-blue",
  },
];

/* 当前正在使用的主题 */
const activeThemeName = ref<ThemeName>(DEFAULT_THEME_NAME);

/* 初始化主题 */
const initTheme = () => {
  setHtmlClassName(activeThemeName.value);
};

/* 设置主题 */
const setTheme = (value: ThemeName) => {
  activeThemeName.value = value;
  setHtmlClassName(value);
};

/* 在 html 根元素上挂载 class */
const setHtmlClassName = (value: ThemeName) => {
  document.documentElement.className = value;
};

/* 导出 hook */
export function useTheme() {
  return { themeList, activeThemeName, initTheme, setTheme };
}
