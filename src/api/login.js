import { dataServer } from "@/common/server";
// 登录
export function AccountLogin(data) {
  return dataServer({
    url: "/api/v1/user/login",
    method: "post",
    data
  });
}
// 获取权限菜单
export function userMenu() {
  return dataServer({
    url: "/api/v1/clinic/menu/user",
    method: "get"
  });
}
// 忘记密码
export function userForget(data) {
  return dataServer({
    url: "/api/v1/user/forget",
    method: "post",
    data
  });
}
// 发送验证码
export function pubSendCode(params) {
  return dataServer({
    url: "/api/v1/pub/sendCode",
    method: "post",
    params
  });
}
