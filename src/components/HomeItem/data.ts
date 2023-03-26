export interface IHomeListItem {
  title: string;
  description?: string;
  id: string;
  icon?: string;
  url?: string;
}

interface technology {
  name: string;
  id: string;
}

export const description: string =
  "本项目是个人从零开始基于 Vue3 搭建的开源后台管理系统，通过该项目您可以快速学习和了解 Vue3 以及相关生态技术，其中一些组件也可以直接拿来使用，项目内容会一直持续更新，也恳请您帮忙点击下方链接，给一个 Star，您的支持是我一直更新的动力。无论是工作或者学习，但愿这个项目都能给您带来帮助！";

export const list: IHomeListItem[] = [
  {
    title: "Vue",
    id: "1",
    url: "https://cn.vuejs.org/",
  },
  {
    title: "Vite",
    id: "2",
    url: "https://cn.vitejs.dev/config/",
  },
  {
    title: "Pinia",
    id: "3",
    url: "https://pinia.vuejs.org/zh/",
  },
  {
    title: "Element-plus",
    id: "4",
    url: "https://element-plus.gitee.io/zh-CN/guide/design.html",
  },
  {
    title: "Mock",
    id: "5",
    url: "http://mockjs.com/",
  },
  {
    title: "Echart",
    id: "6",
    url: "https://echarts.apache.org/zh/index.html",
  },
  {
    title: "TypeScript",
    id: "7",
    url: "https://www.tslang.cn/index.html",
  },
  {
    title: "Axios",
    id: "8",
    url: "https://www.axios-http.cn/",
  },
  {
    title: "Vue-router",
    id: "9",
    url: "https://router.vuejs.org/zh/",
  },
  {
    title: "腾讯地图",
    id: "10",
    url: "https://lbs.qq.com/",
  },
];

export const technologyList: technology[] = [
  {
    name: "Vue3",
    id: "1",
  },
  {
    name: "Vite",
    id: "2",
  },
  {
    name: "TypeScript",
    id: "3",
  },
  {
    name: "Element-Plus",
    id: "4",
  },
  {
    name: "Pinia",
    id: "5",
  },
  {
    name: "Axios",
    id: "6",
  },
  {
    name: "Vue-router",
    id: "7",
  },
  {
    name: "Sass",
    id: "8",
  },
  {
    name: "Echart",
    id: "9",
  },
  {
    name: "Mock",
    id: "10",
  },
  {
    name: "腾讯地图",
    id: "11",
  },
  {
    name: "...",
    id: "12",
  },
];

export const projectTypeList: technology[] = [
  {
    name: "清晰合理的代码结构",
    id: "1",
  },
  {
    name: "多环境配置 【 开发、灰度、生产 】",
    id: "2",
  },
  {
    name: "多主题配置 【 基础、暗黑、深蓝 】",
    id: "3",
  },
  {
    name: "表格基础组件、基于 Element-Plus 封装的甘特图组件",
    id: "4",
  },
  {
    name: "基础地图组件",
    id: "5",
  },
  {
    name: "基础 Echart 组件",
    id: "6",
  },
  {
    name: "面包屑、可缩放侧边菜单栏、标签页快速导航",
    id: "7",
  },
  {
    name: "登录及拦截",
    id: "8",
  },
  {
    name: "Svg 组件封装",
    id: "9",
  },
  {
    name: "系统功能显示隐藏设置",
    id: "10",
  },
  {
    name: "全屏、消息通知",
    id: "11",
  },
  {
    name: "...",
    id: "12",
  },
];
