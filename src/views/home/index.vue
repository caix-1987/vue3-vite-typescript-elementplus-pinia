<script lang="ts" setup>
import { HomeItem } from "@/components";
</script>

<template>
  <div class="app-home">
    <div class="tips">说明</div>
    <div class="list">
      <HomeItem />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list,
.tips {
  margin-top: 20px;
}
</style>
