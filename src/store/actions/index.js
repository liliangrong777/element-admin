import { AccountLogin } from "@api/login";
import { Message } from "element-ui";
import router from "@/router/index";
import cookie from "@/plugin/cookie";
import dao from "@/plugin/_prototype";

export default {
  // 登录
  login(context, data) {
    AccountLogin(data)
      .then(res => {
        context.commit("setClinicInfo", res);
        cookie.set("token", res.token);
        router.push({ path: "/" });
      })
      .catch(err => {
        Message.error(err);
      });
  },
  // 登出
  loginOut() {
    dao._clearLocal();
    cookie.remove("token");
    router.push({ path: "/login" });
  }
};
