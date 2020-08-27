import dao from "@/plugin/_prototype";
export default {
  // 设置诊所信息
  setClinicInfo(state, data) {
    dao._setLocal("clinicInfo", data);
  }
};
