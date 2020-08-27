import NP from "number-precision";
window._myTimer = null;
window._myLastTimer = 0;
export default {
  // 深拷贝
  _cloneDeep(data) {
    return JSON.parse(JSON.stringify(data));
  },
  // 相加
  _plus(num1, num2, ...nums) {
    return NP.plus(num1, num2, ...nums);
  },
  // 相减
  _minus(num1, num2, ...nums) {
    return NP.minus(num1, num2, ...nums);
  },
  // 相乘
  _times(num1, num2, ...nums) {
    return NP.times(num1, num2, ...nums);
  },
  // 相除
  _divide(num1, num2, ...nums) {
    return NP.divide(num1, num2, ...nums);
  },
  _clearLocal() {
    window.localStorage.clear();
  },
  // 设置localStorage属性
  _setLocal(key, val) {
    if (typeof key === "string") {
      window.localStorage.setItem(String(key), JSON.stringify(val));
    } else {
      throw new Error("key必须为string类型");
    }
  },
  // 获取localStorage属性
  _getLocal(key) {
    return JSON.parse(window.localStorage.getItem(String(key)));
  },
  // 防抖
  _debounce(fn, delay = 800) {
    window._myTimer && clearTimeout(window._myTimer);
    window._myTimer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  },
  // 节流
  _throttle(fn, delay = 800) {
    let time = Date.now() - window._myLastTimer;
    if (time > delay) {
      window._myLastTimer = Date.now();
      fn.apply(this, arguments);
    }
  }
};
