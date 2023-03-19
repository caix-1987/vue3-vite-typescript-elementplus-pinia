/* 布局设置 */
interface ILayoutSetingsConfigs {
  /* 是否显示全屏功能 */
  showScreenfull: boolean;
  /* 是否显示通知 */
  showNotify: boolean;
  /* 是否显示标签栏 */
  showTagsView: boolean;
}

const layoutSettings: ILayoutSetingsConfigs = {
  showScreenfull: true,
  showNotify: true,
  showTagsView: true,
};

export default layoutSettings;
