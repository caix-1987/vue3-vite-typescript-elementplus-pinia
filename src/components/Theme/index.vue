<script lang="ts" setup>
import { type ThemeName, useTheme } from "@/hooks/setTheme";

const { themeList, activeThemeName, setTheme } = useTheme();

const selectTheme = (name: ThemeName) => {
  setTheme(name);
};
</script>

<template>
  <el-dropdown trigger="click" @command="selectTheme">
    <div class="app-Theme">
      <el-tooltip effect="dark" content="主题模式" placement="bottom">
        <el-icon class="icon">
          <MagicStick />
        </el-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in themeList"
          :key="item.name"
          :disabled="activeThemeName === item.name"
          :command="item.name"
        >
          <span>{{ item.title }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.app-Theme {
  margin-right: 30px;
  cursor: pointer;
  .icon {
    color: #ffffff;
    vertical-align: middle;
    font-size: 24px;
  }
}
</style>
