<template>
	<div class="headerMain">
		<div></div>
		<div class="title">{{ title }}</div>
		<div class="opBtnWrap">
			<el-button type="primary" @click="resetBack">返回</el-button>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { Plus } from "@element-plus/icons-vue";

const props = defineProps({
	title: {
		type: String,
		default: "",
	},
});
let { title } = toRefs(props);

const router = useRouter();
const resetBack = () => {
	router.push({
		name: "Home",
	});
};
</script>

<style lang="scss" scoped>
.headerMain {
	height: 100%;
	display: grid;
	grid-template-columns: 1fr 3fr 1fr;
	.title {
		font-size: 16px;
		font-weight: bold;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.opBtnWrap {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 10px;
	}
}
</style>
