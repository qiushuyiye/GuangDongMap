<template>
  <div class="header">
    <div class="topDiv">
      <div>
        <img class="iconD" src="../assets/img/companyIcon_white.png" />
      </div>
    </div>
    <div class="topNav">
      <div class="leftTopNav">
        <router-link tag="li" to="/">
          <a>
            <el-icon>
              <House />
            </el-icon>
            &nbsp;首页
          </a>
        </router-link>
        <router-link tag="li" to="/search">
          <a>
            <el-icon>
              <Search />
            </el-icon>
            &nbsp;开始查找
          </a>
        </router-link>
        <router-link v-show="isLogin" tag="li" to="/searchHistory">
          <a>
            <el-icon>
              <Document />
            </el-icon>
            &nbsp;查询记录
          </a>
        </router-link>
        <router-link tag="li" to="/introduce">
          <a>
            <el-icon>
              <Box />
            </el-icon>
            &nbsp;软件介绍
          </a>
        </router-link>
      </div>
      <div class="rightTopNav">
        <!-- <el-badge :is-dot="isDot" class="item" style="padding: 0;width: 36px;">
                    <router-link tag="li" to="/">
                        <a>
                            <el-icon>
                                <Bell />
                            </el-icon>
                        </a>
                    </router-link>
                </el-badge> -->
        <router-link v-show="isAdmin" tag="li" to="/controller/select">
          <a>
            <el-icon>
              <Setting />
            </el-icon>
            &nbsp;管理员界面
          </a>
        </router-link>
        <router-link v-show="!isLogin" tag="li" to="/login">
          <a>
            <el-icon>
              <User />
            </el-icon>
            &nbsp;登入
          </a>
        </router-link>
        <a v-show="isLogin" @click="logOut" href="javascript:;">
          <el-icon>
            <User />
          </el-icon>
          &nbsp;登出
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { makeRequest } from "../util/axiosApi";
import store from "../store";

const isDot = ref(true);
const isLogin = ref(false);
const isAdmin = ref(false);

function logOut() {
  ElMessageBox.confirm("确定要登出？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "info",
  })
    .then(() => {
      makeRequest({
        url: "http://localhost:8080/users/logout",
        method: "get",
        params: {},
        data: {},
        headers: {
          satoken: localStorage.token,
        },
      })
        .then((res) => {
          if (res.data.code == 200) {
            localStorage.token = null;
            localStorage.userRole = "visitor";
            location.reload();
            setTimeout(() => {
              ElMessage({
                message: "登出成功",
                type: "success",
              });
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
    })
    .catch(() => {});
}

onMounted(() => {
  if (localStorage.userRole == "visitor") {
    isLogin.value = false;
  } else if (localStorage.userRole == "admin") {
    isAdmin.value = true;
    isLogin.value = true;
  } else {
    isLogin.value = true;
  }
});
</script>

<style scoped>
.header {
  background-color: rgb(252, 251, 251);
  height: 120px;
}

.iconD {
  width: 130px;
  margin-left: 50px;
  margin-top: 5px;
  height: auto;
}

.topDiv {
  background-color: rgb(159, 64, 58);
  height: 60px;
  display: flex;
  align-items: center;
}

.topNav {
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.topNav a {
  display: flex;
  align-items: center;
  margin: 0 8px;
  color: rgb(59, 59, 59);
  font-weight: 520;
  text-decoration: none;
}

.leftTopNav {
  display: flex;
}

.rightTopNav {
  display: flex;
}

.item {
  margin-top: 22px;
  margin-right: 8px;
}
</style>
