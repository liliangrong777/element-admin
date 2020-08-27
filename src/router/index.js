import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "../store";
import cookie from "@/plugin/cookie";

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();
  if (!cookie.get("token")) {
    return next({ path: "/login" });
  } else {
    store.commit("menu/add", to);
    next();
  }
});
export default router;
