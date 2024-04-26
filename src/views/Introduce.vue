<template>
  <div>
    <div class="block text-center" style="margin: 0 -4vw; margin-bottom: 300px">
      <el-carousel height="550px" motion-blur>
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small justify-center" text="2xl">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="bigDiv">
      <h1>YMAP地域分析系统</h1>
      <div style="display: flex; margin: 50px 0">
        <div
          style="
            width: 24vw;
            height: 500px;
            background-color: rgba(234, 20, 20, 0.3);
          "
        >
          图片
        </div>
        <div
          style="
            width: 100%;
            height: 500px;
            background-color: rgba(60, 180, 60, 0.3);
          "
        >
          文章
        </div>
      </div>
    </div>
    <div class="bigDiv">
      <h1>专业团队</h1>
      <div style="display: flex">
        <div v-for="item in 4" class="homeBottomDiv">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(1) {
  background-image: url("../assets/img/companyIcon.png");
  background-size: auto 100%;
  background-repeat: no-repeat;
}

.el-carousel__item:nth-child(2) {
  background-color: #d3dce6;
}

.bigDiv {
  text-align: center;
  height: 100vh;
}

.homeBottomDiv {
  background-color: cadetblue;
  width: 20vw;
  height: 32vw;
  margin: 0 auto;
  border-radius: 3px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.3);
}
</style>
