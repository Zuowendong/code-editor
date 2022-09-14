<template>
	<el-menu class="elMenu" :default-active="activeMenu" @select="handleSelect">
		<el-menu-item v-for="item in menus" :key="item.id" :index="item.router">
			<span>{{ item.name }}</span>
		</el-menu-item>
	</el-menu>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const menus = reactive([
	{ id: 1, name: "场景管理", router: "Scene" },
	{ id: 2, name: "组件管理", router: "Components" },
]);

const router = useRouter();
const handleSelect = (routerName) => {
	router.push({
		name: routerName,
	});
};
let activeMenu = ref("");
onMounted(() => {
	activeMenu.value = "Scene";
	handleSelect("Scene");
});

const handleDragStart = async (e, item) => {
	e.dataTransfer &&
		e.dataTransfer.setData(
			"comp-drag",
			JSON.stringify({
				name: item.name,
				type: item.type,
			})
		);
};
</script>

<style scoped lang="scss">
.elMenu.el-menu {
	border-right: none;
}
</style>
