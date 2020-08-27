const menu = [
  { path: "/home", title: "首页", icon: "el-icon-location", code: 0 },
  {
    path: "/menu1",
    title: "菜单一",
    code: 10,
    icon: "el-icon-location",
    children: [
      {
        path: "/menu1/page1",
        title: "页面一",
        icon: "el-icon-location",
        code: 100
      },
      {
        path: "/menu1/page2",
        title: "页面二",
        icon: "el-icon-location",
        code: 101
      },
      {
        path: "/menu1/page3",
        title: "页面三",
        icon: "el-icon-location",
        code: 102
      }
    ]
  },
  {
    path: "/menu2",
    title: "菜单二",
    code: 20,
    icon: "el-icon-location",
    children: [
      {
        path: "/menu2/page1",
        title: "页面一",
        icon: "el-icon-location",
        code: 200
      },
      {
        path: "/menu2/page2",
        title: "页面二",
        icon: "el-icon-location",
        code: 101
      }
    ]
  }
];

export default menu;
