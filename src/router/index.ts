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
      icon: "vite",
    },
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          isShowSideBar: true,
          title: "首页",
          icon: "vite",
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
      icon: "vite",
    },
    children: [
      {
        path: "/table-one",
        name: "Table-one",
        component: () => import("@/views/table-page/table-one-page.vue"),
        meta: {
          isShowSideBar: true,
          title: "第一个表格",
          icon: "vite",
        },
      },
      {
        path: "/table-two",
        name: "Table-two",
        component: () => import("@/views/table-page/table-two-page.vue"),
        meta: {
          isShowSideBar: true,
          title: "第二个表格",
          icon: "vite",
        },
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
