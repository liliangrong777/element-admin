/*
 * 顶部菜单栏
 */

import router from "@/router/index";

const blackList = ["/login"];
//默认页
const defaultRoute = {
  path: "/",
  meta: {
    title: "首页"
  }
};
export default {
  namespaced: true,
  state: {
    //菜单列表
    headerMenu: [],
    //路由初始值
    currentRoute: defaultRoute.path
  },
  mutations: {
    //增加
    add(state, router) {
      if (blackList.includes(router.path)) return;
      const menus = state.headerMenu;
      const route = {
        path: router.path,
        title: router.meta.title
      };
      let isExtra = menus.find(item => item.path === route.path);
      if (!isExtra) {
        menus.push(route);
      }
      state.currentRoute = route.path;
    },
    //删除
    sub(state, path) {
      let index = state.headerMenu.findIndex(item => item.path === path);
      let isSelf = path === state.currentRoute;
      if (isSelf) {
        if (index === 0) {
          state.currentRoute = state.headerMenu[1].path;
        } else {
          state.currentRoute = state.headerMenu[index - 1].path;
        }
        router.push({ path: state.currentRoute });
      }
      state.headerMenu.splice(index, 1);
    },
    //清空
    clear(state) {
      if (router.currentRoute.path === "/home") {
        const route = {
          path: "/home",
          title: "首页"
        };
        state.headerMenu = [route];
      } else {
        state.headerMenu = [];
        router.push(defaultRoute);
      }
    }
  }
};
