<template>
  <div class="maxdiv">
    <div class="ICPdiv">
      <p>
        Copyright
        <i class="el-icon-user-solid" />
        {{ new Date().getFullYear() }} TY Clinic
      </p>
      <p class="">
        <a href="http://beian.miit.gov.cn/" target="_blank"
          >ICP备案号：湘ICP备18024112号</a
        >
      </p>
    </div>
    <div class="right_div">
      <div class="title_div">
        <div class="name_div">
          同雲CIS
        </div>
        <div class="nbsp"></div>
        <div class="title_info">
          <h2>基层诊疗信息管理系统</h2>
          <span>先询医·后问药</span>
        </div>
      </div>
      <!-- 登录表单 -->
      <div class="userform" v-if="showEdit === false">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="rules"
          label-width="10px"
          class="demo-ruleForm"
        >
          <!-- 手机号 -->
          <el-form-item prop="phone">
            <el-input
              v-model.number="loginForm.phone"
              type="text"
              placeholder="请输入手机号/账号"
              prefix-icon="el-icon-user-solid"
            >
            </el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="passWord">
            <el-input
              type="password"
              v-model="loginForm.passWord"
              placeholder="请输入密码"
              prefix-icon="el-icon-user-solid"
              @keyup.enter.native="login"
            >
            </el-input>
          </el-form-item>
          <div class="forget_btn">
            <el-button
              type="text"
              @click="toQQ"
              style="margin-left: 10px; color: white;"
            >
              在线咨询
            </el-button>
            <el-button
              type="text"
              style="color: white;"
              @click="showEdit = true"
            >
              忘记密码
            </el-button>
          </div>
          <el-form-item>
            <el-button
              type="primary"
              style="width:100%; background-color:#FFCC00; color: black; font-size: 20px; font-weight: bold; letter-spacing: 40px;text-indent: 38px;"
              @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <!-- 忘记密码表单 -->
      <div class="userform" v-else>
        <h2
          style="color: white; font-size: 30px;letter-spacing: 5px;font-weight: 400;"
        >
          忘记密码
        </h2>
        <el-form
          :model="editForm"
          ref="editForm"
          label-width="10px"
          class="demo-ruleForm"
          :rules="rules"
        >
          <!-- 手机号 -->
          <el-form-item prop="editPhone">
            <el-input
              v-model.number="editForm.phone"
              type="text"
              placeholder="请输入手机号/账号"
              prefix-icon="el-icon-user-solid"
            >
            </el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="pass">
            <el-input
              type="password"
              v-model="editForm.password"
              placeholder="请输入密码"
              prefix-icon="el-icon-user-solid"
            >
            </el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item prop="passwordAgain">
            <el-input
              type="password"
              v-model="editForm.passwordAgain"
              placeholder="请确认密码"
              prefix-icon="el-icon-user-solid"
            >
            </el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item prop="code">
            <el-input
              type="password"
              v-model="editForm.code"
              style="width:70%"
              placeholder="请输入验证码"
              prefix-icon="el-icon-user-solid"
            >
            </el-input>
            <el-button
              style="width:30%;padding-left:10px;"
              v-if="!codeshow"
              size="default"
              @click="getCode()"
              type="primary"
            >
              获取验证码
            </el-button>
            <el-button
              v-else
              size="default"
              disabled
              style="width:30%;"
              type="primary"
            >
              {{ auth_time }}秒
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width:100%; font-size: 20px; font-weight: bold; letter-spacing: 40px;text-indent: 38px;"
              @click="editLogin()"
              >确认</el-button
            >
          </el-form-item>
          <el-button
            type="text"
            @click="showEdit = false"
            style="margin-left: 10px; color: white;"
          >
            &nbsp;返回登录页面
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { userForget, pubSendCode } from "@api/login";
import enCode from "@/plugin/enCode";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(value);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        // if (this.ruleForm.checkPass !== "") {
        //   this.$refs.ruleForm.validateField("checkPass");
        // }
        callback();
      }
    };
    return {
      //登录表单
      loginForm: {
        phone: "",
        passWord: "",
        passWordConfirm: ""
      },
      //忘记密码表单
      editForm: {
        phone: "",
        code: "",
        passWord: "",
        passwordAgain: ""
      },
      //忘记密码
      showEdit: false,
      //倒计时
      codeshow: false,
      auth_time: 60,
      rules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        passWord: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        passwordAgain: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 跳转qq
    toQQ() {
      window.open(
        "http://wpa.qq.com/msgrd?v=3&uin=2355342676&site=qq&menu=yes"
      );
    },
    //登录
    login() {
      this.$refs.loginForm.validate(valid => {
        if (!valid) return;
        let timestamp = Date.now();
        const params = {
          ...this.loginForm,
          passWord: enCode(enCode(this.loginForm.passWord) + timestamp),
          timestamp
        };
        this.$store.dispatch("login", params);
      });
    },
    //修改密码登录
    editLogin() {
      if (this.editForm.password !== this.editForm.passwordAgain) {
        return this.$message.error("密码不一致");
      }
      userForget(this.editForm)
        .then(() => {
          this.showEdit = false;
          this.$message.success("修改密码成功");
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    //验证码
    getCode() {
      if (!/^1[3456789]\d{9}$/.test(this.editForm.phone)) {
        this.$message.error("手机号码格式有误");
      } else {
        pubSendCode({ phone: this.editForm.phone });
        this.codeshow = true;
        this.auth_time = 60;
        var timer = setInterval(() => {
          this.auth_time--;
        }, 1000);
        setTimeout(() => {
          clearInterval(timer);
          this.codeshow = false;
        }, 60000);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.maxdiv {
  height: 100vh;
  position: relative;
  background: url("./assets/back@1080.jpg") 0 0 no-repeat scroll transparent;
  background-size: cover;
  overflow: hidden;
}
.right_div {
  background-color: rgba(6, 129, 206, 0.78);
  position: absolute;
  top: -200px;
  right: 0;
  bottom: -200px;
  width: 58%;
  border-radius: 70% 0 0 50%;
  .title_div {
    position: absolute;
    top: 400px;
    left: 30%;
    height: 80px;
    line-height: 80px;
    color: white;
    .name_div {
      display: inline-block;
      font-size: 40px;
      letter-spacing: 10px;
      margin-right: 10px;
    }
    .nbsp {
      display: inline-block;
      position: absolute;
      top: 5px;
      height: 70px;
      width: 5px;
      background-color: white;
    }
    .title_info {
      display: inline-block;
      letter-spacing: 10px;
      position: absolute;
      width: 400px;
      top: 10px;
      line-height: 30px;
      text-align: center;
      h2 {
        font-size: 26px;
        font-weight: 400;
      }
    }
  }
  .userform {
    position: absolute;
    width: 310px;
    top: 600px;
    left: 40%;
    h2 {
      text-align: center;
      margin-bottom: 20px;
    }
  }
}
.forget_btn {
  display: flex;
  justify-content: space-between;
}
.ICPdiv {
  z-index: 999;
  position: absolute;
  left: 45%;
  bottom: 5px;
  color: #606266;
  font-size: 12px;
  a {
    text-decoration: none;
    color: #606266;
  }
}
</style>
<style lang="scss">
.userform {
  .el-input__inner {
    border: 0;
  }
  .el-input__icon {
    width: 20px;
  }
}
</style>
