<template>
  <div class="app">
    <el-container>
      <el-header class="headerC">
        <Header />
      </el-header>
      <el-main class="mainC">
        <router-view />
      </el-main>
      <el-footer class="footerC">
        <Footer />
      </el-footer>
      <el-backtop :bottom="100">
        <div id="backTop">顶部</div>
      </el-backtop>
    </el-container>
  </div>
</template>

<script setup>
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
</script>

<style scoped>
.app {
  padding: 0;
  margin: 0;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  background-color: whitesmoke;
}

.headerC {
  padding: 0;
  height: auto;
}

.mainC {
  width: 100%;
  padding: 0 4vw;
  min-height: 57vh;
}

.footerC {
  width: 100%;
  padding: 0;
}

#backTop {
  height: 100%;
  width: 100%;
  background-color: var(--el-bg-color-overlay);
  box-shadow: var(--el-box-shadow-lighter);
  text-align: center;
  line-height: 40px;
  color: #1989fa;
  font-size: 16px;
  border-radius: 50%;
  font-weight: 600;
}
</style>

<style>
.el-button:focus {
  outline: none;
}
</style>
