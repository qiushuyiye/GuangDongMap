<template>
  <div class="controllerDiv">
    <h2>算法参数设置</h2>
    <div class="controllerMain">
      <div class="controllerCell">
        <span>ExcelSheet编号</span>
        <input v-model="settings.excelSheetNo" placeholder="请输入" />
      </div>
      <div class="controllerCell">
        <span>Excel起始行</span>
        <input v-model="settings.startCell" placeholder="请输入" />
      </div>
      <div class="controllerCell">
        <span>Excel结束行</span>
        <input v-model="settings.endCell" placeholder="请输入" />
      </div>
      <div class="controllerCell">
        <span>位点起始列</span>
        <input v-model="settings.startColumn" placeholder="请输入" />
      </div>
      <div class="controllerCell">
        <span>位点结束列</span>
        <input v-model="settings.endColumn" placeholder="请输入" />
      </div>
      <div class="controllerCell">
        <span>最大步长</span>
        <input v-model="settings.maxScore" placeholder="请输入" />
      </div>
      <div class="controllerCell">
        <span>最小成功数</span>
        <input v-model="settings.minSuccessNum" placeholder="请输入" />
      </div>
      <div class="controllerCell">
        <span>数据长度</span>
        <input v-model="settings.topNum" placeholder="请输入" />
      </div>
    </div>
    <el-button @click="submitAlgorithm">提交</el-button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { makeRequest } from "../util/axiosApi";

const settings = ref({});

const userInput = ref({}); // 用于存储用户输入的临时对象

function submitAlgorithm() {
  // 更新原始的 settings 对象
  for (const key in userInput.value) {
    settings.value[key] = userInput.value[key];
  }

  makeRequest({
    url: "http://localhost:8080/settings/updateSelective",
    method: "post",
    params: {},
    data: JSON.stringify({
      excelSheetNo: settings.value.excelSheetNo,
      maxScore: settings.value.maxScore,
      minSuccessNum: settings.value.minSuccessNum,
      topNum: settings.value.topNum,
      starColumn: settings.value.starColumn,
      endColumn: settings.value.endColumn,
      startCell: settings.value.endColumn,
      endCell: settings.value.endColumn,
    }),
    headers: {
      "Content-Type": "application/json",
      satoken: localStorage.token,
    },
  })
    .then((res) => {
      // console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function getSettings() {
  makeRequest({
    url: "http://localhost:8080/settings/getOneBySettingId",
    method: "get",
    params: {
      settingId: 1,
    },
    data: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
      satoken: localStorage.token,
    },
  })
    .then((res) => {
      settings.value = res.data.data;
      userInput.value = settings.value;
    })
    .catch((error) => {
      console.error(error);
    });
}

onMounted(() => {
  getSettings();
});
</script>

<style scoped>
.controllerDiv {
  margin-top: 50px;
}

.controllerMain {
  margin: 10px auto;
}

.controllerCell {
  display: flex;
  width: 300px;
  margin: 0 auto;
  margin-bottom: 5px;
  justify-content: center;
}

.controllerCell span {
  width: 120px;
  text-align: right;
  font-size: 14px;
}

.controllerCell input {
  width: 120px;
  padding: 0 5px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  margin-left: 10px;
}

.controllerCell input:focus {
  box-shadow: 0 0 2px 1px rgba(65, 65, 65, 0.5);
  outline: none;
}
</style>
