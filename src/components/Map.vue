<template>
  <div style="width: 100%; margin-top: 50px">
    <div class="loading-container" v-if="!isLoaded">
      <div class="loading-spinner"></div>
    </div>
    <div class="mapC">
      <!-- 地图 -->
      <component v-if="isLoaded" :is="dynamicComponent" />
      <!-- 地区占比 -->
      <div style="padding: 0 10px">
        <el-table
          :data="tableData"
          class="tableDiv"
          row-key="id"
          default-expand-all
          :default-sort="{ prop: 'percentage', order: 'descending' }"
          v-show="isLoaded"
        >
          <!-- <el-table-column :label="'样本编号: ' + sampleNumber"> -->
          <el-table-column prop="mapName" label="地区" width="120px" />
          <el-table-column prop="percentage" label="概率">
            <template #default="scope">
              <div style="display: flex">
                <span style="width: 60px">{{ scope.row.percentage }}</span>
                <div style="width: 300px; margin-left: 10px; padding-top: 8px">
                  <el-progress
                    :percentage="parseFloat(scope.row.percentage)"
                    :width="150"
                    :show-text="false"
                  />
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 姓氏占比 -->
      <div v-show="isLoaded">
        <span style="font-size: 16px;font-weight: 550;">{{ nowMapName }}</span>
        <div id="eChartsId" style="width: 400px; height: 400px"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import * as echarts from "echarts";
import { makeRequest } from "../util/axiosApi";
import { useStore } from "vuex";

const store = useStore();

const tableData = ref([]);
const allOutputData = ref([]);
const NameList = ref([]);

const isLoaded = ref(false);

const dynamicComponent = ref(null);
const nowMapName = ref();

let myChart = null;

const selectedMapComponent = computed(async () => {
  const mapType = store.state.selectedMapComponent;

  const componentPath = await import(`./city/${mapType}.vue`);

  return componentPath;
});

const loadDynamicComponent = async () => {
  tableData.value.forEach((data) => {
    if (data.mapName == nowMapName.value) {
    } else {
      data.children.forEach((child) => {
        if (child.mapName == nowMapName.value) {
        } else {
          NameList.value = [];
        }
      });
    }
  });
  if (nowMapName.value == "广东省") {
  } else {
    NameList.value = [];
  }
  nowMapName.value = store.state.selectedMapComponent;
  if (
    store.state.selectedMapComponent.includes("省") ||
    store.state.selectedMapComponent.includes("市")
  ) {
    try {
      const module = await selectedMapComponent.value;
      dynamicComponent.value = module.default;
    } catch (error) {
      // console.error("Error loading component:", error);
    }
  }
  formatAllOutputData(allOutputData.value);
  EC();
};

const algorithms = async () => {
  try {
    store.state.fileUrlList.forEach((fileUrl) => {
      makeRequest({
        url: "http://localhost:8080/algorithms/Algorithm",
        method: "post",
        params: {},
        data: {
          fileUrl,
        },
        headers: {
          "Content-Type": "application/json",
          satoken: localStorage.token,
        },
      })
        .then((res) => {
          let fatherOutputData = res.data.data.fatherOutputData;
          let resultData = formatFatherOutputData(fatherOutputData);

          allOutputData.value = res.data.data.allOutputData;
          formatAllOutputData(allOutputData.value);

          tableData.value = resultData;
          store.state.mapList = resultData;

          isLoaded.value = true;

          EC();
        })
        .catch((error) => {
          console.error(error);
        });
    });
  } catch (error) {
    console.error(error);
  }
};

const formatFatherOutputData = (inputData) => {
  const cities = {}; // 用来存储不同城市的数据
  const list = []; // 存储格式化后的数据

  const entries = Object.entries(inputData);
  // 将数据按城市分组

  entries.forEach(([key, value]) => {
    let cityName;
    let subRegionName;

    const provinceIndex = key.indexOf("省");
    const cityIndex = key.indexOf("市");

    // 确定城市名称和子区域名称
    if (cityIndex !== -1) {
      if (provinceIndex !== -1) {
        cityName = key.substring(provinceIndex + 1, cityIndex + 1);
      } else {
        cityName = key.substring(0, cityIndex + 1);
      }
      subRegionName = key.substring(cityIndex + 1); // 子区域名称为市之后的部分
    } else {
      cityName = key;
      subRegionName = ""; // 父区域名称为空
    }

    if (!cities[cityName]) {
      cities[cityName] = {};
    }
    cities[cityName][subRegionName] = value;
  });

  // 格式化数据
  Object.entries(cities).forEach(([cityName, cityData], index) => {
    const totalCityValue = Object.values(cityData).reduce(
      (acc, curr) => acc + curr,
      0
    );

    const city = {
      id: index + 1,
      mapName: cityName,
      percentage: (
        (totalCityValue /
          Object.values(inputData).reduce((acc, curr) => acc + curr, 0)) *
        100
      ).toFixed(2),
      color: "",
    };

    // 计算子区域百分比
    const hasChildren = Object.keys(cityData).some(
      (subRegionName) => subRegionName !== ""
    ); // 判断是否有子区域
    if (hasChildren) {
      city.children = [];

      Object.entries(cityData).forEach(([subRegionName, value], subIndex) => {
        // 排除父区域
        if (subRegionName !== "") {
          const percentage = ((value / totalCityValue) * 100).toFixed(2);
          city.children.push({
            id: (index + 1) * 10 + subIndex + 1,
            mapName: subRegionName,
            percentage: percentage,
          });
        }
      });

      // 根据子区域百分比高低对子区域进行排序
      city.children.sort(
        (a, b) => parseFloat(b.percentage) - parseFloat(a.percentage)
      );
    }

    list.push(city);
  });
  // 为每个城市和子区域添加颜色属性
  let G = 0;
  let g = Math.round(255 / list.length); // 更大的变化范围
  let B = 0;
  let b = Math.round(255 / list.length); // 更大的变化范围

  list.forEach((city, cityIndex) => {
    // 城市颜色
    let cityColor = "rgb(255," + G + "," + B + ")"; // 更大的变化范围
    G += g;
    B += b;

    city.color = cityColor;

    // 子区域颜色
    if (city.children && city.children.length > 0) {
      let subRegionG = 0;
      let g1 = Math.round(255 / city.children.length);
      let subRegionB = 0;
      let b1 = Math.round(255 / city.children.length);

      city.children.forEach((subRegion, subIndex) => {
        let subRegionColor = "rgb(255," + subRegionG + "," + subRegionB + ")"; // 更大的变化范围
        subRegionG += g1;
        subRegionB += b1;

        subRegion.color = subRegionColor;
      });
    }
  });
  return list;
};

const formatAllOutputData = (inputData) => {
  inputData.forEach((item) => {
    item.forEach((element) => {
      if (element.regionName == store.state.selectedMapComponent) {
        NameList.value = convertData(element.surname);
      }
    });
  });
};

const convertData = (data) => {
  return data.map((item) => {
    const name = Object.keys(item)[0];
    const value = parseFloat(item[name]).toFixed(2);
    return { name, value: parseFloat(value) };
  });
};

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

watch(() => store.state.selectedMapComponent, loadDynamicComponent, {
  immediate: true,
});
watch(() => store.state.fileUrlList, algorithms, { immediate: false });

onMounted(() => {
  algorithms();
});
</script>

<style scoped>
.mapC {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.tableDiv {
  width: 480px;
  margin: 50px 0;
  border-radius: 5px;
  box-shadow: 0px 0px 2px 1px rgba(165, 165, 165, 0.4);
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7986cb;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

<style>
.el-table__cell {
  border-right: 0px !important;
}
</style>
