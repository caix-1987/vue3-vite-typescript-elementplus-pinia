<script lang="ts" setup>
import { list } from "./data";
</script>

<template>
  <div class="app-home-list">
    <div class="technology-item" v-for="item in list" :key="item.title">
      <div class="item-pm">
        <Svg-icon :name="item.technologyIcon" font-size="60px"></Svg-icon>
        <div class="title">{{ item.title }}</div>
        <!-- <div class="des">{{ item.description }}</div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-home-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .technology-item {
    width: 33.33%;
    .item-pm {
      margin: 10px;
      padding: 10px;
      border-radius: 6px;
      background: #ffffff;
      text-align: center;
      cursor: pointer;
      .title {
        text-align: center;
        font-size: 32px;
        font-weight: bold;
        color: #409eff;
        padding: 20px 0;
      }
      .des {
        text-align: left;
        padding: 10px;
      }
      &:hover {
        background: #ecf5ff;
      }
    }
  }
}
</style>
