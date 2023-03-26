<script lang="ts" setup>
import { reactive } from "vue";
import {
  description,
  list,
  technologyList,
  projectTypeList,
} from "@/components/HomeItem/data";
</script>
<template>
  <div class="app-author">
    <el-card>
      <h3>项目介绍</h3>
      <div class="content">
        <p class="des">{{ description }}</p>
        <div>
          <p class="des">
            代码地址 :
            <a
              target="_blank"
              href="https://github.com/caix-1987/vue3-vite-typescript-elementplus-pinia"
            >
              <i
                >https://github.com/caix-1987/vue3-vite-typescript-elementplus-pinia</i
              >
            </a>
          </p>
          <p class="des">
            联系方式 :
            <i>cai_xin@foxmail.com</i>
          </p>
        </div>
        <h3 style="padding-top: 10px; margin-bottom: 10px">
          项目主要技术栈和功能特性及相关学习推荐
        </h3>
        <div class="technology">
          <ul>
            <li v-for="item in technologyList" :key="item.id">
              {{ item.name }}
            </li>
          </ul>
          <ul>
            <li v-for="item in projectTypeList" :key="item.id">
              {{ item.name }}
            </li>
          </ul>
          <div class="study">
            <h4>学习推荐</h4>
            <div class="study-list">
              <el-tag
                class="item"
                type="info"
                v-for="item in list"
                :key="item.id"
              >
                <a :href="item.url" target="_blank">
                  {{ item.title }}
                </a>
              </el-tag>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.app-author {
  width: 100%;
  .content {
    .des {
      font-size: 16px;
      line-height: 32px;
      color: var(--text-color);
    }
    .technology {
      display: flex;
      justify-content: space-between;
      ul {
        width: 40%;
      }

      li {
        padding: 8px;
        font-size: 16px;
      }
    }
    .study {
      margin-right: 30px;
      width: 20%;
      align-self: flex-end;
      h4 {
        margin-bottom: 20px;
      }
      .study-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item {
          padding: 20px;
          width: 48%;
          margin-bottom: 20px;
          cursor: pointer;
        }
      }
    }
  }
  i {
    color: teal;
    padding-left: 10px;
  }
}
</style>
