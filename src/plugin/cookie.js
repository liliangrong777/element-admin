import Cookie from "js-cookie";

const cookie = {};
//存储cookie
cookie.set = function(name = "default", value = "", setting = {}) {
  var realSetting = {
    expires: 1
  };
  Object.assign(realSetting, setting);
  return Cookie.set(`ta3.0-${name}`, value, realSetting);
};
//拿到cookie
cookie.get = function(name = "default") {
  return Cookie.get(`ta3.0-${name}`);
};
//全部的cookie值
cookie.getAll = function() {
  return Cookie.get();
};
//移除cookie
cookie.remove = function(name = "default") {
  return Cookie.remove(`ta3.0-${name}`);
};

export default cookie;
