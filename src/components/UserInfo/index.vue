<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useTagsViewStore } from "@/store/modules/tags";
import { useUserInfoStore } from "@/store/modules/userInfo";

const tagsStore = useTagsViewStore();
const userInfo = useUserInfoStore();
const username = localStorage.getItem("Caix_username");
const router = useRouter();
const loginOut = () => {
  tagsStore.tagList = [];
  userInfo.setUserInfo.token = "";
  localStorage.setItem("token", "");
  localStorage.setItem("Caix_username", "");
  router.push("/login");
};
</script>
<template>
  <el-dropdown size="large" placement="bottom-start">
    <div class="app-userInfo">
      <img src="@/assets/caix.png" alt="" />
      <span>{{ username }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <a
          target="_blank"
          href="https://github.com/caix-1987/vue3-vite-typescript-elementplus-pinia"
        >
          <el-dropdown-item> gitHub 地址 </el-dropdown-item>
        </a>
        <a href="javascript:void">
          <el-dropdown-item> 进入个人博客 </el-dropdown-item>
        </a>
        <el-dropdown-item divided>
          <span @click="loginOut">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.app-userInfo {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  img {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    margin-right: 10px;
  }
  span {
    color: #ffffff;
  }
}
</style>
