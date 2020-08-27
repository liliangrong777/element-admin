import axios from "axios";
import cookie from "./cookie";
import { stringify } from "qs";

// 开发环境显示错误信息
function errorLog(msg) {
  let err = new Error(msg);
  if (process.env.NODE_ENV === "development") {
    console.log("服务器错误日志：", err);
  }
  throw msg;
}
function createService(baseURL = "127.0.0.1") {
  // 创建一个 axios 实例
  const service = axios.create({
    baseURL,
    timeout: 60000 // 请求超时时间
  });

  // 请求拦截器
  service.interceptors.request.use(
    config => {
      // get 参数序列化 空格 数组
      if (config.method === "get") {
        config.paramsSerializer = function(params) {
          return stringify(params, { indices: false });
        };
      }
      config.headers["Content-Type"] = "application/json; charset=UTF-8";
      // 在请求发送之前做一些处理
      if (config.url.indexOf("/login") === -1) {
        config.headers["token"] = cookie.get("token");
      }
      return config;
    },
    error => {
      errorLog(error.message);
    }
  );

  // 响应拦截器
  service.interceptors.response.use(
    response => {
      if (response.data.code !== 200) {
        errorLog(response.data.message);
      }
      return response.data.data;
    },
    error => {
      if (error && error.response) {
        switch (error.response.status) {
          case 400:
            error.message = "请求错误";
            break;
          case 401:
            error.message = "未授权，请登录";
            cookie.remove("token");
            window.location = "/#/login";
            break;
          case 403:
            error.message = "拒绝访问";
            break;
          case 404:
            error.message = "请求地址出错";
            break;
          case 408:
            error.message = "请求超时";
            break;
          case 500:
            error.message = "服务器内部错误";
            break;
          case 501:
            error.message = "服务未实现";
            break;
          case 502:
            error.message = "网关错误";
            break;
          case 503:
            error.message = "服务不可用";
            break;
          case 504:
            error.message = "网关超时";
            break;
          case 505:
            error.message = "HTTP版本不受支持";
            break;
          default:
            break;
        }
      }
      errorLog(error.message);
      return Promise.reject(error);
    }
  );
  return service;
}

export default createService;
