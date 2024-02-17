import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore(
  "theme",
  () => {
    const theme = ref("");

    const setTheme = (newTheme) => {
      theme.value = newTheme;
    };

    const removeTheme = () => {
      theme.value = "";
    };

    return {
      theme,
      setTheme,
      removeTheme,
    };
  },
  {
    persist: true,
  }
);
