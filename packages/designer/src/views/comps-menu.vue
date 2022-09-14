<template>
	<div class="menuMain">
		<el-menu
			class="elMenu"
			active-text-color="#ffd04b"
			background-color="#1d2531"
			text-color="#fff"
			@select="handleSelect"
		>
			<el-menu-item
				v-for="item in menus"
				:key="item.id"
				:index="item.id"
				draggable="true"
				@dragstart="handleDragStart($event, item)"
			>
				<span>{{ item.name }}</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script setup>
import { onMounted } from "vue";

const menus = reactive([
	{ id: 1, name: "容器", type: "ZyfContainer" },
	{ id: 2, name: "文字标签", type: "ZyfText" },
	{ id: 3, name: "输入框", type: "ZyfInput" },
	{ id: 4, name: "下拉框", type: "ZyfSelect" },
	{ id: 5, name: "单选按钮组", type: "ZyfRadio" },
	{ id: 6, name: "复选按钮组", type: "ZyfCheckbox" },
]);

const getComps = () => {
	menus.length = 0;
	const internalInstance = getCurrentInstance();
	const comps = internalInstance.appContext.components;
	Object.values(comps).forEach((item) => {
		if (item.__nodeType && item.__nodeType === "comp_menu") {
			menus.push({
				id: item.__hmrId,
				type: item.name,
				name: item.buildInfo.name,
			});
		}
	});
};
onMounted(() => getComps());

const handleSelect = (index, indexPath, item, routeResult) => {
	console.log(index, indexPath, item, routeResult);
};

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
.menuMain {
	width: 100%;
	.elMenu.el-menu {
		border-right: none;
	}
}
</style>
