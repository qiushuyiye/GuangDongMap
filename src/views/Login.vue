<template>
  <div class="loginPage">
    <div class="loginDiv">
      <h2 style="margin: 50px 0 0 0">登录</h2>
      <div class="inputForm">
        <el-input class="inputDiv" v-model="userId" placeholder="账户" />
        <el-input
          class="inputDiv"
          v-model="userPassword"
          type="password"
          placeholder="密码"
          show-password
          @keyup.enter="submit"
        />
        <el-button class="inputButton" @click="submit">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import store from "../store";
import router from "../router";
import { ElMessage, ElMessageBox } from "element-plus";
import { makeRequest } from "../util/axiosApi";

const userId = ref();
const userPassword = ref();

function submit() {
  if (userId.value == null) {
    ElMessage({
      message: "用户名不能为空",
      type: "warning",
    });
  } else if (userPassword.value == null) {
    ElMessage({
      message: "密码不能为空",
      type: "warning",
    });
  } else {
    makeRequest({
      url: "http://localhost:8080/users/login",
      method: "post",
      params: {},
      data: {
        userName: userId.value,
        userPassword: userPassword.value,
      },
      headers: {
        satoken: localStorage.token,
      },
    })
      .then((res) => {
        if (res.data.code == 200) {
          localStorage.token = res.data.data.tokenValue;
          localStorage.userRole = res.data.data.loginId;
          router.push("/")
          setTimeout(() => {
            location.reload()
          }, 100);
        } else {
          ElMessageBox.alert(res.data.msg, "警告", {
            confirmButtonText: "确认",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
</script>

<style scoped>
.loginPage {
  min-height: 55vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.loginDiv {
  margin-top: 5vw;
  background-color: rgb(255, 255, 255);
  width: 28vw;
  min-width: 500px;
  height: 19vw;
  min-height: 340px;
  border-radius: 15px;
  box-shadow: 0px 0px 8px 5px rgba(165, 165, 165, 0.6);
}

.inputForm {
  width: 70%;
  margin: 0 auto;
}

.inputDiv {
  height: 36px;
  margin-top: 30px;
}

.inputButton {
  margin-top: 30px;
}
</style>
