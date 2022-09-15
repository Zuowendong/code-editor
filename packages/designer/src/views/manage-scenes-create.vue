<script setup>
import { reactive, ref, watch } from "vue";

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
});
let { modelValue } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);

const onClose = () => {
	emit("update:modelValue", false);
	formData.value = {};
	formRef.value && formRef.value.resetFields();
};

let formData = ref({});
const rules = reactive({
	name: [
		{ required: true, message: "Please input scene name", trigger: "blur" },
		{ min: 3, max: 18, message: "Length should be 3 to 18", trigger: "blur" },
	],
});
// 确定点击事件
const formRef = ref();
const submitHandle = async () => {
	if (!formRef.value) return;
	await formRef.value.validate((valid) => {
		if (valid) {
			console.log("submit!");
		}
	});
};
</script>

<template>
	<div>
		<el-dialog v-model="modelValue" title="新增场景" :close-on-click-modal="false" @close="onClose">
			<el-form ref="formRef" :model="formData" label-width="100px" :rules="rules">
				<el-form-item label="场景名称" prop="name">
					<el-input v-model="formData.name" />
				</el-form-item>
			</el-form>

			<template #footer>
				<div class="dialog-footer">
					<el-button @click="onClose">取消</el-button>
					<el-button type="primary" @click="submitHandle">确定</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<style></style>
