import dao from "@/plugin/_prototype";
// 配置主题
const themeList = ["normal", "star", "line", "green", "druk"];

export default {
  namespaced: true,
  state: {
    //当前主题
    currentTheme: ""
  },
  mutations: {
    //切换
    change(state) {
      let currentIndex = themeList.findIndex(t => t === state.currentTheme);
      if (currentIndex >= themeList.length - 1) {
        state.currentTheme = themeList[0];
      } else {
        state.currentTheme = themeList[++currentIndex];
      }
      this.commit("theme/save");
      this.commit("theme/dom");
    },
    //加载
    load(state) {
      state.currentTheme = dao._getLocal("currentTheme") || "normal";
      this.commit("theme/save");
      this.commit("theme/dom");
    },
    //持久化
    save(state) {
      dao._setLocal("currentTheme", state.currentTheme);
    },
    //操作dom
    dom(state) {
      document.body.setAttribute("class", state.currentTheme);
    }
  }
};
