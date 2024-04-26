<template>
    <div>
        <div style="display: flex;align-items: center;">
            <el-button @click="backSelect">back</el-button>
            <h2 style="margin-left: 40%;">Title</h2>
        </div>
        <el-form :model="form" label-width="auto" style="max-width: 600px;margin: 0 auto;">
            <el-form-item label="Activity name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="Activity zone">
                <el-select v-model="form.region" placeholder="please select your zone">
                    <el-option label="Zone one" value="1" />
                    <el-option label="Zone two" value="2" />
                </el-select>
            </el-form-item>
            <el-form-item label="Activity time">
                <el-col :span="11">
                    <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
                </el-col>
                <el-col :span="2" class="text-center">
                    <span class="text-gray-500">-</span>
                </el-col>
                <el-col :span="11">
                    <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%" />
                </el-col>
            </el-form-item>
            <el-form-item label="Activity form">
                <el-input v-model="form.desc" type="textarea" :autosize="{ minRows: 4 }" />
            </el-form-item>
        </el-form>
        <div style="display: flex;justify-content: center;width: 100%;">
            <el-button type="primary" @click="onSubmit">添加</el-button>
            <el-button @click="resetForm">清空</el-button>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import router from '../../router'

const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    desc: '',
})

const onSubmit = () => {
    console.log(form)
}

const backSelect = () => {
    router.push('/controller/select')
}

const resetForm = () => {
    // 重置表单对象的属性为初始值
    Object.keys(form).forEach(key => {
        form[key] = ''
    })
}
</script>
