<!-- 骨架 -->
<template>
  <div id="layout">
    <!-- 顶栏 -->
    <header class="header">
      <div class="left">
        图片区域
      </div>
      <div class="center">
        <div class="center-left" @click="isCollapse = !isCollapse">
          <i class="el-icon-s-unfold" v-if="isCollapse"></i>
          <i class="el-icon-s-fold" v-else></i>
        </div>
        <div class="center-right">
          <el-button type="primary" class="header-icon">
            <i class="el-icon-message-solid"></i>
          </el-button>
          <!-- 主题切换 -->
          <el-button type="primary" class="header-icon" @click="change">
            <i class="el-icon-s-opportunity"></i>
          </el-button>
          <el-button type="primary" class="header-icon">
            <i class="el-icon-s-platform"></i>
          </el-button>
        </div>
      </div>
      <div class="right">
        <span @click="loginOut">注销</span>
      </div>
    </header>
    <!-- 主体 -->
    <div class="center">
      <!-- 左侧菜单  -->
      <el-menu
        unique-opened
        :default-active="activeTab"
        :collapse="isCollapse"
        class="el-menu-vertical-demo"
        router
      >
        <template v-for="sub in menus">
          <el-submenu :index="sub.path" v-if="sub.children" :key="sub.path">
            <template slot="title">
              <i :class="sub.icon"></i>
              <span>{{ sub.title }} </span>
            </template>
            <div>
              <el-menu-item
                :index="item.path"
                v-for="item in sub.children"
                :key="item.path"
              >
                <i :class="item.icon"></i>
                {{ item.title }}
              </el-menu-item>
            </div>
          </el-submenu>
          <el-menu-item v-else :index="sub.path" :key="sub.path" class="el-submenu-item-menu">
            <i :class="sub.icon"></i>
            <span> {{ sub.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
      <div class="container">
        <header class="header">
          <!-- 顶部菜单 -->
          <el-tabs
            v-model="activeTab"
            type="card"
            class="tab-list"
            @tab-remove="tabRemove"
            @tab-click="pushRoute"
          >
            <el-tab-pane
              v-for="item in tabs"
              :key="item.path"
              :label="item.title"
              :name="item.path"
              :closable="tabs.length !== 1"
            >
            </el-tab-pane>
          </el-tabs>
          <div class="tab-option">
            <el-button
              @click="clearTab"
              :disabled="tabs.length === 1"
              class="el-icon-error tab-clear"
            >
            </el-button>
          </div>
        </header>
        <div class="main">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menus from "./menu";
import { mapState, mapMutations } from "vuex";
export default {
  components: {},
  data() {
    return {
      //菜单
      menus,
      //左侧菜单折叠
      isCollapse: false,
      //顶部活跃tab
      activeTab: "",
      //当前主题索引
      currentThemeIndex: 0
    };
  },
  computed: {
    //tab集合 && 当前路由
    ...mapState({
      tabs: state => state.menu.headerMenu,
      currentRoute: state => state.menu.currentRoute
    })
  },
  watch: {
    currentRoute(val) {
      this.activeTab = val;
    }
  },
  created() {},
  mounted() {
    this.activeTab = this.currentRoute;
    this.load();
  },
  methods: {
    ...mapMutations("menu", {
      clearTab: "clear",
      tabRemove: "sub"
    }),
    ...mapMutations("theme", {
      load: "load",
      change: "change"
    }),
    // 路由跳转
    pushRoute(tab) {
      this.$router.push({ path: tab.name });
    },
    loginOut() {
      this.$confirm("确认退出登录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("loginOut");
      });
    }
  }
};
</script>
<style src="@/assets/theme/index.scss" lang="scss"></style>
