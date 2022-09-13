<script>
export default { name: "XuiInputNumber" };
</script>
<script setup>
import { computed, ref, toRefs, watch } from "vue";

const props = defineProps({
	modelVal: {
		type: Object,
		default: () => {
			return {};
		},
	},
});

let { modelVal } = toRefs(props);
const emit = defineEmits(["updateCompProps"]);

const handleChange = (num, val) => {
	emit("updateCompProps", {
		...val,
		value: num,
	});
};

let num = ref(modelVal.value.value);
watch(
	() => props.modelVal,
	(val) => {
		num.value = val.value;
	},
	{ deep: true }
);
</script>

<template>
	<div class="xuiInputNumberMain">
		{{ val }}
		<el-input-number
			class="inputNumber"
			v-model="num"
			:min="1"
			controls-position="right"
			@change="handleChange(num, modelVal)"
		/>
	</div>
</template>

<style scoped>
.inputNumber {
	width: 100%;
}
</style>
