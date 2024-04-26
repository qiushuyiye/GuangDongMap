<template>
  <div>
    <div v-show="isSure" class="sureDiv">
      <div class="sureMain">
        <div style="height: 200px">
          <h3>已经上传的文件</h3>
          <div v-for="url in fileUrlList">
            <span>{{ url }}</span>
          </div>
        </div>
        <div style="display: flex; justify-content: center">
          <el-button @click="reUpload">继续上传</el-button>
          <el-button @click="uploadFinish">确认</el-button>
        </div>
      </div>
    </div>
    <div v-show="isResult" class="uploadC">
      <el-upload
        class="uploadClass"
        drag
        action="http://localhost:8080/file/upload"
        :on-success="handleUploadSuccess"
        :before-upload="beforeUpload"
        :on-remove="handleRemove"
        accept=".report,.codis,.ddem"
        :limit="1"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          将文件拖放到此处或 <em>点击上传</em>
          <br />
          <span style="font-size: 12px; color: rgba(0, 0, 0, 0.5)"
            >单次只能上传一份文件</span
          >
        </div>
      </el-upload>
      <el-button @click="changeIsResult">上传完成</el-button>
    </div>
    <Map v-if="!isResult" />
  </div>
</template>

<script setup>
import { UploadFilled } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import Map from "./Map.vue";
import { ref } from "vue";
import store from "../store";

const isSure = ref(false);
const isResult = ref(true);
const fileUrlList = ref([]);

function reUpload() {
  isSure.value = !isSure.value;
}

function changeIsResult() {
  isSure.value = !isSure.value;
}

function uploadFinish() {
  store.state.fileUrlList = fileUrlList.value;
  isResult.value = !isResult.value;
  isSure.value = !isSure.value;
}

function handleUploadSuccess(response, file, fileList) {
  fileUrlList.value.push(response);
}

function beforeUpload(file) {
  const fileExists = fileUrlList.value.some((item) => item.includes(file.name));
  if (fileExists) {
    ElMessageBox.alert("文件 " + file.name + " 已经存在", "重复上传", {
      confirmButtonText: "确认",
    });
    return false; // 阻止文件上传
  }
  return true; // 允许文件上传
}

function handleRemove(file, fileList) {
  // 在文件被移除时更新fileUrlList数组
  const index = fileUrlList.value.findIndex((item) => item.includes(file.name));
  if (index !== -1) {
    fileUrlList.value.splice(index, 1);
    ElMessage({
      message: "成功移除 " + file.name,
      type: "success",
    });
  }
}
</script>

<style scoped>
.uploadC {
  height: auto;
  width: 30vw;
  min-width: 300px;
  margin: 0 auto;
  margin-top: 10vh;
}

.uploadClass {
  box-shadow: 0 0 5px 1px rgba(165, 165, 165, 0.4);
  border-radius: 5px;
}

.sureDiv {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
}

.sureMain {
  width: 500px;
  height: 240px;
  background-color: whitesmoke;
  margin: 0 auto;
  margin-top: 16vh;
  border-radius: 3px;
  padding: 40px 20px;
}
</style>
