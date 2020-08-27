import ElementUI from "element-ui";

import prototypes from "./_prototype";

import "./rem.js";

export default {
  install(Vue) {
    //阻止生产提示
    Vue.config.productionTip = false;
    //设置原型
    Object.keys(prototypes).forEach(prop => {
      Vue.prototype[prop] = prototypes[prop];
    });

    Vue.use(ElementUI, { size: "middle", zIndex: 1000 });
  }
};
