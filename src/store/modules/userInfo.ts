import { reactive } from "vue";
import { defineStore } from "pinia";

interface IuserInfo {
  username: string;
  token: string;
}

export const useUserInfoStore = defineStore("userInfo", () => {
  const setUserInfo: IuserInfo = reactive({
    username: "",
    token: "",
  });

  return { setUserInfo };
});
