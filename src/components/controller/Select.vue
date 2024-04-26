<template>
    <div>
        <div style="text-align: left;">
            <el-button @click="toAdd()"
                style="border: none;border-radius: 5px 5px 0 0;background-color: white;">添加</el-button>
        </div>
        <el-table :data="tableData" style="border-radius: 0 5px 5px 5px;width: 80vw;"
            :header-cell-style="{ 'text-align': 'center', 'background': 'white' }"
            :cell-style="{ 'text-align': 'center' }">
            <el-table-column prop="date" label="Date" width="120" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="region" label="Region" width="100" />
            <el-table-column prop="desc" label="Desc" min-width="500" />
            <el-table-column label="操作" width="200px">
                <template #default="{ row }">
                    <el-button @click="toUpdate(row)">编辑</el-button>
                    <el-button type="danger" @click="handleDelete(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div style="width: 100%;display: flex;margin-top: 30px;justify-content: center;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '../../router'
import store from '../../store';

const tableData = ref([
    { date: '2001.01.01', region: 1, name: 'qwer', desc: '123456' },
    { date: '2001.01.02', region: 2, name: 'qwer', desc: '123456' },
    { date: '2001.01.03', region: 1, name: 'qwer', desc: '123456' },
    { date: '2001.01.04', region: 1, name: 'qwer', desc: '123456' },
    { date: '2001.01.05', region: 2, name: 'qwer', desc: '123456' },
    { date: '2001.01.06', region: 1, name: 'qwer', desc: '123456' },
])

const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(100);
const handleSizeChange = (size) => {
    pageSize.value = size;
};

const handleCurrentChange = (page) => {
    currentPage.value = page;
};

const toAdd = () => {
    router.push('/controller/add')
}

const toUpdate = (row) => {
    router.push('/controller/update')

    store.state.updateValue = row

    // makeRequest({
    //     url: '',
    //     method: 'post',
    //     params: {},
    //     data: {
    //     },
    //     headers: {
    //     },
    // })
    //     .then(res => {
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
}

const handleDelete = (row) => {
    ElMessageBox.confirm(
        '确定要删除？',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            // 处理删除用户的逻辑
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '删除取消',
            })
        })
}
</script>
