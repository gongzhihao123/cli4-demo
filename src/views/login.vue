<template>
  <div class="login" :style="'background-image:url(' + Background + ');'">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      label-width="0px"
      class="login-form"
    >
      <h3 class="title">
        幼儿园后台管理系统
      </h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
          <!-- <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" /> -->
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <!-- <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" /> -->
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          class="validCode"
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <!-- <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" /> -->
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" />
        </div>
      </el-form-item>
      <!-- <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">
        记住我
      </el-checkbox> -->
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { encrypt } from "@/uitls/rsaEncrypt";
import api from "@/api/user";
import Background from "@/assets/img/background.jpg";
export default {
  name: "Login",
  data() {
    return {
      Background: Background,
      codeUrl: "",
      cookiePass: "",
      loginForm: {
        username: "admin",
        password: "123456",
        rememberMe: false,
        code: "",
        captchaKey: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
      },
      loading: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  created() {
    // 获取验证码
    this.getCode();
    // 获取用户名密码等Cookie
  },
  methods: {
    getCode() {
      api.apiCodeImgUrl().then(res => {
        this.codeUrl = res.imgBase64;
        this.loginForm.captchaKey = res.key;
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        let temPassword = this.loginForm.password;
        const user = {
          username: this.loginForm.username,
          password: encrypt(temPassword),
          code: this.loginForm.code,
          captchaKey: this.loginForm.captchaKey
        };
        if (valid) {
          this.loading = true;
          api
            .apiLogin(user)
            .then(res => {
              this.loading = false;
              // console.log(res.auth)
              window.localStorage.setItem("token", res.token);
              this.$router.push("/procedureManage");
            })
            .catch(() => {
              this.loading = false;
              this.apiCodeImgUrl();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
}
.title {
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 385px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  display: inline-block;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
</style>
<style>
@media screen and (max-width: 500px) {
  * {
    box-sizing: border-box;
  }
  /* .login { position: static; width: auto; height: auto; margin: 0 30px; border: 0; border-radius: 0; } */
  .login-form {
    width: 80%;
  }
  .login-form .validCode {
    width: 40% !important;
  }
  .login-form .login-code {
    width: auto;
  }
  .logo {
    margin: 50px auto;
  }
  .login .form-item {
    width: auto;
  }
  .login .form-item input,
  .login .form-item button,
  .login .reg-bar {
    width: 100%;
  }
}
</style>
