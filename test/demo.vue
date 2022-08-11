<template>
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
        <div class="content">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input-number v-model="formData.age"></el-input-number>
            </el-form-item>
        </div>
    </el-form>
</template>
<style lang="scss" scoped>
.content {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
    column-gap: 10px;
}
</style>
