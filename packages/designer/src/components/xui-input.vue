<script>
export default { name: "XuiInput" };
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

const handleChange = (text, val) => {
	emit("updateCompProps", {
		...val,
		value: text,
	});
};

let text = ref(modelVal.value.value);
watch(
	() => props.modelVal,
	(val) => {
		text.value = val.value;
	},
	{ deep: true }
);
</script>

<template>
	<div class="xuiInputMain">
		{{ val }}
		<el-input class="input" v-model="text" :min="1" @input="handleChange(text, modelVal)" />
	</div>
</template>

<style scoped>
.input {
	width: 100%;
}
</style>
