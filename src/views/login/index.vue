<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { type FormInstance, FormRules, ElMessage } from "element-plus";
import { type LoginFormRequest } from "@/api/login/type";
import { useUserInfoStore } from "@/store/modules/userInfo";

const userInfo = useUserInfoStore();
const router = useRouter();
const loginFormRef = ref<FormInstance>();
const loginFormData: LoginFormRequest = reactive({
  username: "caix-1987",
  password: "123456",
});
const formRules: FormRules = {
  username: [{ required: true, trigger: "red", message: "请输入用户名" }],
  password: [{ required: true, trigger: "red", message: "请输入密码" }],
};

const submit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      userInfo.setUserInfo.username = loginFormData.username;
      userInfo.setUserInfo.token = "hasToken";
      localStorage.setItem("token", userInfo.setUserInfo.token);
      ElMessage.success("登录成功");
      router.push("/");
    }
  });
};
</script>

<template>
  <div class="app-login">
    <div class="header">
      <img src="@/assets/caix.png" alt="" />
      <div>
        <span>
          一个基于
          <i> vue3 + vite + typeScript + elementPlus + pinia + ... </i>
          中后台开源管理系统，无论学习还是工作，愿它能给您带来帮助 💪 !
        </span>
        <span class="tel">cai_xin@foxmail.com</span>
      </div>
    </div>
    <div class="login-box">
      <!--  <svg-icon name="vue" font-size="80px"></svg-icon> -->
      <svg-icon name="vite" font-size="80px"></svg-icon>
      <el-form
        ref="loginFormRef"
        :model="loginFormData"
        :rules="formRules"
        class="form-input"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="User"
            v-model="loginFormData.username"
            class="input"
            placeholder="请输入用户名"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            prefix-icon="Unlock"
            v-model="loginFormData.password"
            class="input"
            placeholder="请输入密码"
          />
        </el-form-item>
      </el-form>
      <el-button class="button" @click="submit(loginFormRef)">登陆</el-button>
    </div>
    <p class="footer">by caix-1987 @2023</p>
  </div>
</template>

<style lang="scss" scoped>
.app-login {
  width: 100vw;
  height: 100vh;
  position: relative;
  //background: var(--caix-sidebar-menu-bg-color);
  background: -webkit-radial-gradient(
    50% -100%,
    closest-corner,
    rgb(182, 0, 255),
    #f7cf23,
    var(--caix-sidebar-menu-bg-color)
  );
  overflow: hidden;
  .login-box {
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 60%;
    height: 50%;
    text-align: center;
  }
  .form-input {
    width: 360px;
    margin: 0 auto;
    padding-top: 40px;
    padding-left: 20px;
    .input {
      height: 48px;
    }
  }
  .button {
    width: 340px;
    height: 48px;
    border-radius: 4px;
    font-size: 18px;
    margin-left: 20px;
    background: linear-gradient(90deg, #f7cf23, #f7cf23, #f7cf23);
    border: none;
    letter-spacing: 6px;
  }
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  background: #151515;
  width: 100%;
  padding: 10px;
  color: #c0c4cc;
  font-size: 14px;
  display: flex;
  img {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    vertical-align: middle;
    margin-right: 20px;
  }
  i {
    font-size: 16px;
    font-weight: 600;
    padding: 0 10px;
    color: #f7cf23;
  }
  span {
    display: block;
  }
  .tel {
    padding-top: 10px;
    color: rgb(88, 141, 216);
  }
  .tel::before {
    content: "Tel Me :";
    font-weight: 600;
    padding-right: 10px;
  }
}
.footer {
  color: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 12px;
  display: none;
}
:deep(.el-input__wrapper) {
  border-radius: 4px !important;
}
:deep(.is-focus) {
  box-shadow: 0 0 0 1px rgb(182, 0, 255) inset;
}
:deep(.el-input__inner) {
  padding-left: 20px;
}
:deep(.el-input__icon) {
  font-size: 28px;
  font-weight: bold;
  margin-left: 16px;
}
:deep(.el-input__prefix-inner) {
  padding-left: 10px;
}
:deep(.el-form-item__content) {
  margin-bottom: 10px;
}
:deep(.el-form-item__error) {
  padding-top: 10px;
  font-size: 14px;
}
</style>
