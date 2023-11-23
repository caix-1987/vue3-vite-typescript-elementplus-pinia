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
    meta: {
      title: "首页",
      isShowSideBar: true,
      icon: "HomeFilled",
    },
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          isShowSideBar: true,
          title: "首页",
          icon: "HomeFilled",
        },
      },
    ],
  },
  {
    path: "/table",
    name: "Table",
    redirect: "/table-one",
    component: layout,
    meta: {
      isShowSideBar: true,
      title: "表格组件",
      icon: "Calendar",
    },
    children: [
      {
        path: "/table-one",
        name: "Table-one",
        component: () => import("@/views/table-page/table-one-page.vue"),
        meta: {
          isShowSideBar: true,
          title: "基础表格",
          icon: "Calendar",
        },
      },
      {
        path: "/table-two",
        name: "Table-two",
        component: () => import("@/views/table-page/table-two-page.vue"),
        meta: {
          isShowSideBar: true,
          title: "甘特图",
          icon: "Calendar",
        },
      },
    ],
  },
  {
    path: "/map",
    name: "map",
    component: layout,
    redirect: "/map/mapTencent",
    meta: { isShowSideBar: true, title: "地图组件", icon: "MapLocation" },
    children: [
      {
        path: "/map/mapTencent",
        name: "mapTencent",
        component: () => import("@/views/map/mapTencent.vue"),
        meta: { isShowSideBar: true, title: "地图组件", icon: "MapLocation" },
      },
    ],
  },
  {
    path: "/chart",
    name: "chart",
    component: layout,
    redirect: "/chart/chart-one",
    meta: { isShowSideBar: true, title: "chart 组件", icon: "PieChart" },
    children: [
      {
        path: "/chart/chart-one",
        name: "chart-one",
        component: () => import("@/views/chart/index.vue"),
        meta: { isShowSideBar: true, title: "chart 组件", icon: "PieChart" },
      },
    ],
  },
  {
    path: "/baseComponent",
    name: "baseComponent",
    component: layout,
    redirect: "/baseComponent/baseComponent-one",
    meta: { isShowSideBar: true, title: "其他组件", icon: "Help" },
    children: [
      {
        path: "/baseComponent/baseComponent-one",
        name: "baseComponent-one",
        component: () => import("@/views/baseComponent/index.vue"),
        meta: { isShowSideBar: true, title: "其他组件", icon: "Help" },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true, isShowSideBar: false },
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: { hidden: true, isShowSideBar: false },
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: { hidden: true, isShowSideBar: false },
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
