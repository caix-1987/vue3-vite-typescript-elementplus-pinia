<script lang="ts" setup>
import { list } from "./data";
</script>

<template>
  <div class="app-home-list">
    <div class="technology-item" v-for="item in list" :key="item.title">
      <Svg-icon :name="item.technologyIcon" font-size="80px"></Svg-icon>
      <div>{{ item.description }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-home-list {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  .technology-item {
    padding: 10px;
    display: column;
    text-align: center;
    width: 100%;
    flex: 1 1 33.33%;
  }
}
</style>
