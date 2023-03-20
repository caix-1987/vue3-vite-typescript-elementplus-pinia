interface IHomeListItem {
  technologyIcon: string;
  title: string;
  description: string;
}

export const list: IHomeListItem[] = [
  {
    technologyIcon: "vite",
    title: "vite",
    description: "vite 的相关描述信息",
  },
  {
    technologyIcon: "vue",
    title: "vue",
    description: "Vue 的相关描述信息",
  },
];
