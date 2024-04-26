<template>
  <div>
    <div v-show="isResult">
      <div class="tbC">
        <el-table
          :data="currentPageData"
          class="tableDiv"
          :style="{ width: '100%' }"
          style="border-radius: 0 5px 5px 5px"
          :cell-style="{ 'text-align': 'center' }"
          :header-cell-style="{
            'text-align': 'center',
            fontSize: '16px',
          }"
          @row-click="clickRow"
        >
          <el-table-column label="查询历史">
            <el-table-column prop="date" label="时间" width="180" />
            <el-table-column prop="sampleNum" label="样本编号" width="240" />
            <el-table-column prop="successNum" label="成功数" width="80" />
            <el-table-column
              prop="result"
              label="查询文件"
              min-width="500"
              :formatter="formatResult"
            />
          </el-table-column>
        </el-table>
      </div>
      <div class="pageDiv">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <div v-show="!isResult">
      <div class="btn" @click="backTo()">
        返回
      </div>
      <Map v-if="!isResult" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { makeRequest } from "../util/axiosApi";
import { useStore } from "vuex";
import Map from "../components/Map.vue";

const store = useStore();

const tableData = ref([]);
const currentPageData = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const isResult = ref(true);

const fetchData = () => {
  makeRequest({
    url: "http://localhost:8080/records/getAll",
    method: "get",
    params: {},
    headers: {
      token: localStorage.token,
    },
  })
    .then((res) => {
      tableData.value = res.data.data;
      total.value = res.data.data.length;
      updateCurrentPageData();
    })
    .catch((error) => {
      console.error(error);
    });
};

const updateCurrentPageData = () => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  currentPageData.value = tableData.value.slice(startIndex, endIndex);
};

const handleSizeChange = (val) => {
  pageSize.value = val;
  updateCurrentPageData();
};

const handleCurrentChange = (val) => {
  currentPage.value = val;
  updateCurrentPageData();
};

function formatResult(row, column, cellValue, index) {
  return cellValue.replace("D:/uploads/", "");
}

function backTo(){
  isResult.value = true
}

function clickRow(row, event, column) {
  store.state.fileUrlList = []
  store.state.fileUrlList.push(row.result)
  isResult.value = false
  // console.log(row.result);
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.tbC {
  margin-top: 50px;
}

.tableDiv {
  width: 480px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.pageDiv {
  display: flex;
  justify-content: center;
  padding: 2vw;
  margin-bottom: 50px;
}

.btn{
  border: 1px solid rgba(75, 75, 75, 0.2);
  width: 80px;
  height: 32px;
  font-size: 16px;
  line-height: 32px;
  border-radius: 8px;
  background-color: rgba(214, 214, 214, 0.4);
  cursor: pointer;
  margin-top: 20px;
}
</style>

<style>
.el-table.el-table th.el-table__cell {
  background-color: rgb(245, 247, 250);
}
</style>
