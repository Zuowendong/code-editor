<script>
export default { name: "ZyfText" };
</script>

<script setup>
import { onMounted, ref, toRefs, watch } from "vue";

const props = defineProps({
	width: { type: Number, default: 100 },
	height: { type: Number, default: 30 },
	text: { type: String, default: "" },
});

let { width, height, text } = toRefs(props);
</script>

<template>
	<div class="textMain">{{ text }}</div>
</template>

<style scoped>
.textMain {
	width: v-bind(width);
	height: v-bind(height);
	border: 1px solid #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	color: #fff;
}
</style>
