<template>
  <div class="home">
    <div class="block text-center" style="margin: 0 -4vw 300px -4vw">
      <el-carousel height="550px" motion-blur>
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small justify-center" text="2xl">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div ref="counterDiv" class="bigDiv">
      <div>
        <h1>海量数据</h1>
        <div class="counterDiv">
          <div>
            <div class="counterD"></div>
            <vue3-autocounter
              class="counter"
              :startAmount="0"
              :endAmount="10000"
              :duration="2"
              prefix="共收录"
              suffix="个地区"
              separator=","
              decimalSeparator="."
              :decimals="0"
              :autoinit="false"
              ref="counter1"
            />
          </div>
          <div>
            <div class="counterD"></div>
            <vue3-autocounter
              class="counter"
              :startAmount="0"
              :endAmount="10000"
              :duration="2"
              prefix="共收录"
              suffix="人数"
              separator=","
              decimalSeparator="."
              :decimals="0"
              :autoinit="false"
              ref="counter2"
            />
          </div>
          <div>
            <div class="counterD"></div>
            <vue3-autocounter
              class="counter"
              :startAmount="0"
              :endAmount="10000"
              :duration="2"
              prefix="共收录"
              suffix="个姓氏"
              separator=","
              decimalSeparator="."
              :decimals="0"
              :autoinit="false"
              ref="counter3"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="bigDiv">
      <div>
        <h1>精准定位</h1>
        <div class="map">
          <GuangDong />
          <div>
            <el-table
              :data="tableData"
              class="tableDiv"
              row-key="id"
              default-expand-all
              :default-sort="{ prop: 'percentage', order: 'descending' }"
            >
              <!-- <el-table-column :label="'样本编号: ' + sampleNumber"> -->
              <el-table-column prop="mapName" label="地区" width="120px" />
              <el-table-column prop="percentage" label="概率">
                <template #default="scope">
                  <div style="display: flex">
                    <span style="width: 60px">{{ scope.row.percentage }}</span>
                    <div
                      style="width: 300px; margin-left: 10px; padding-top: 8px"
                    >
                      <el-progress
                        :percentage="parseFloat(scope.row.percentage)"
                        :width="150"
                        :show-text="false"
                      />
                    </div>
                  </div>
                </template>
              </el-table-column>
              <!-- </el-table-column> -->
            </el-table>
          </div>
          <div id="eChartsId" style="width: 400px !important; height: 400px"></div>
        </div>
      </div>
    </div>
    <div class="bigDiv" style="margin: 200px 0">
      <div>
        <h1>专业团队</h1>
        <div style="display: flex">
          <div v-for="item in 4" class="homeBottomDiv">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GuangDong from "../components/city/广东省.vue";
import * as echarts from "echarts";
import { ref, onMounted } from "vue";

const counterDiv = ref(null);
const counter1 = ref(null);
const counter2 = ref(null);
const counter3 = ref(null);

let myChart = null

const tableData = ref([
  {
    id: 1,
    mapName: "潮州市",
    percentage: "19.05",
    color: "rgb(255,0,0)",
    children: [
      {
        id: 11,
        mapName: "潮安区",
        percentage: "100.00",
        color: "rgb(255,0,0)",
      },
    ],
  },
  {
    id: 2,
    mapName: "广州市",
    percentage: "66.66",
    color: "rgb(255,85,85)",
    children: [
      {
        id: 22,
        mapName: "海珠区",
        percentage: "64.29",
        color: "rgb(255,0,0)",
      },
      {
        id: 21,
        mapName: "天河区",
        percentage: "35.71",
        color: "rgb(255,85,85)",
      },
    ],
  },
  {
    id: 3,
    mapName: "东莞市",
    percentage: "14.29",
    color: "rgb(255,170,170)",
  },
]);

const NameList = ref([
    {
        "name": "张",
        "value": 31.48
    },
    {
        "name": "赵",
        "value": 25.93
    },
    {
        "name": "孙",
        "value": 16.67
    },
    {
        "name": "王",
        "value": 25.93
    }
]);


function EC() {
  myChart = echarts.init(document.getElementById("eChartsId"));
  myChart.setOption({
    tooltip: {
      trigger: "item",
    },
    legend: {
      itemWidth: 32,
      itemHeight: 16,
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "姓氏",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 32,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: NameList.value,
      },
    ],
  });
}

onMounted(() => {
  EC()
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // 触发回调的阈值
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 如果进入视口，启动所有计数器
        counter1.value.start();
        counter2.value.start();
        counter3.value.start();
        observer.unobserve(entry.target); // 只触发一次
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  observer.observe(counterDiv.value);
});
</script>

<style scoped>
.home {
  padding: 0;
  margin: 0;
  height: auto;
  min-height: 100vh;
  width: 100%;
}

.map {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.tableDiv{
  width: 450px;
}

.bigDiv {
  text-align: center;
  min-height: 75vh;
  /* margin: 320px 0 300px 0; */
}

.counterDiv {
  display: flex;
  margin-bottom: 280px;
  justify-content: space-around;
}

.counterD {
  width: 25vw;
  margin: 0 auto;
  height: 250px;
  background-color: #475669;
}

.counter {
  font-size: 24px;
  font-weight: 600;
}

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

.el-carousel__item:nth-child(2n) {
  background-image: url("../assets/img/companyIcon.png");
  background-size: auto 100%;
  background-repeat: no-repeat;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.homeBottomDiv {
  background-color: #475669;
  width: 20vw;
  height: 32vw;
  margin: 0 auto;
  border-radius: 3px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.3);
}
</style>
