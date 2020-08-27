import Layout from "@/common/Layout.vue";
const _import = require("@/plugin/_import.js");

const frameIn = [
  // 首页
  {
    path: "/",
    redirect: { path: "/home" },
    component: Layout,
    children: [
      {
        path: "/home",
        name: "home",
        component: _import("home/index.vue"),
        meta: { title: "首页" }
      }
    ]
  },
  // 菜单一
  {
    path: "/menu1",
    name: "menu1",
    mate: { title: "菜单一" },
    component: Layout,
    children: [
      {
        path: "page1",
        name: "page1",
        component: _import("menu1/page1.vue"),
        meta: { title: "页面1" }
      },
      {
        path: "page2",
        name: "page2",
        component: _import("menu1/page2.vue"),
        meta: { title: "页面2" }
      },
      {
        path: "page3",
        name: "page3",
        component: _import("menu1/page3.vue"),
        meta: { title: "页面3" }
      }
    ]
  },
  // 菜单二
  {
    path: "/menu2",
    name: "menu2",
    mate: { title: "菜单二" },
    component: Layout,
    children: [
      {
        path: "page1",
        name: "page1",
        component: _import("menu2/page1.vue"),
        meta: { title: "页面1" }
      },
      {
        path: "page2",
        name: "page2",
        component: _import("menu2/page2.vue"),
        meta: { title: "页面2" }
      }
    ]
  }
];
const frameOut = [
  // 登录
  {
    path: "/login",
    name: "login",
    component: _import("login/index.vue")
  }
];

export default [...frameIn, ...frameOut];
