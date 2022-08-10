<template>
    <el-dialog
        v-model="modelValue"
        title="投诉信息登记"
        :close-on-click-modal="false"
        @close="onClose"
    >
        <el-form
            ref="formRef"
            :model="formData"
            :rules="rules"
            label-width="100px"
        >
            <div class="content"></div>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="onClose">取消</el-button>
                <el-button type="primary" @click="onSubmit">保存</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<style lang="scss" scoped>
.content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 14px;
}
</style>
