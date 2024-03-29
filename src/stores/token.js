import { defineStore } from "pinia";
import { ref } from "vue";

export const useTokenStore = defineStore(
  "token",
  () => {
    const token = ref("");

    // 设置token
    const setToken = (newToken) => {
      token.value = newToken;
    };

    // 移除token
    const removeToken = () => {
      token.value = "";
    };

    return {
      token,
      setToken,
      removeToken,
    };
  },
  {
    persist: true, // pinia持久化
  }
);
