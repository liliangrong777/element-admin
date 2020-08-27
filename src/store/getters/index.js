import dao from "@/plugin/_prototype";
export default {
  //诊所信息
  clinicInfo() {
    return dao._getLocal("clinicInfo") || {};
  }
};
