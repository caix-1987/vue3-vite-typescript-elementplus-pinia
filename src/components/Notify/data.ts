export interface IListItem {
  avatar?: string;
  title: string;
  dateTime?: string;
  description?: string;
  status?: "" | "success" | "info" | "warning" | "danger";
  extra?: string;
}

export const notifyData: IListItem[] = [
  {
    avatar: "vite",
    title: "caix-1987: vue3 + vite + element-plus + pinia",
    dateTime: "今天",
    description: "一个开源免费的中后台管理系统基础解决方案",
  },
];

export const messageData: IListItem[] = [
  {
    avatar: "vite",
    title: "caix-1987: vue3 + vite + element-plus + pinia",
    dateTime: "2023-3-15",
    description: "一个开源免费的中后台管理系统基础解决方案",
  },
];

export const todoData: IListItem[] = [
  {
    title: "任务名称 - caix-1987: vue3 + vite + element-plus + pinia",
    description: "一个开源免费的中后台管理系统基础解决方案",
    extra: "未开始",
    status: "info",
    avatar: "vite",
  },
  {
    title: "任务名称 - caix-1987: vue3 + vite + element-plus + pinia",
    description: "一个开源免费的中后台管理系统基础解决方案",
    extra: "进行中",
    status: "",
    avatar: "vite",
  },
  {
    title: "任务名称 - caix-1987: vue3 + vite + element-plus + pinia",
    description: "一个开源免费的中后台管理系统基础解决方案",
    extra: "已完成",
    status: "success",
    avatar: "vite",
  },
  {
    title: "任务名称 - caix-1987: vue3 + vite + element-plus + pinia",
    description: "一个开源免费的中后台管理系统基础解决方案",
    extra: "已结束",
    status: "danger",
    avatar: "vite",
  },
];
