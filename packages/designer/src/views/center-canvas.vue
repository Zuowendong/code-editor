<script setup>
import { ref, getCurrentInstance, toRefs, onMounted } from "vue";
import { throttle, cloneDeep } from "lodash-es";
import { indexedDBUtil } from "@zyf/utils";

import { useCompStore } from "../store/component";
import { compTemplateData } from "../utils/compTemplateData";
import { formatStyle, formatProps } from "../utils/formatComp";

import CompBox from "./comp-box.vue";
import CompRender from "./comp-render.vue";
import { indexedDBConfig } from "../config/indexedDB";

const props = defineProps({
	sceneInfo: {
		type: Object,
		default: () => {
			return {};
		},
	},
});
let { sceneInfo } = toRefs(props);

const getSceneDataByIndexedDB = async () => {
	const { dbName, storeName, version } = indexedDBConfig;
	const db = await indexedDBUtil.openDB(dbName, storeName, version);
	const data = await indexedDBUtil.getDataByKey(db, storeName, sceneInfo.value.projectId);
	if (data) compStore.compsList = data.details;
};

onMounted(() => {
	compStore.compsList.length = 0;
	getSceneDataByIndexedDB();
});

/**
 * 属性处理
 */
const internalInstance = getCurrentInstance();
const handleProps = async (item) => {
	let compPropMap = {};
	const compProps = internalInstance.appContext.components[item.type].customProps;
	cloneDeep(compProps).forEach((el) => {
		let attrMap = {};
		if (el.attrs) {
			el.attrs.forEach((attrItem) => {
				attrMap[attrItem.key] = attrItem;
			});
		}
		compPropMap[el.id] = {
			...el,
			attrs: attrMap,
		};
	});

	return compPropMap;
};

/**
 * 拖入事件
 */
const compStore = useCompStore();
const handleCompDrop = async (e) => {
	if (e.dataTransfer) {
		const dropData = JSON.parse(e.dataTransfer.getData("comp-drag"));
		const propData = await handleProps(dropData);
		const compDataModle = {
			...dropData,
			props: propData,
		};
		if (dropData.type === "ZyfContainer") compDataModle.children = [];
		let compData = compTemplateData(compDataModle);
		compData = initPosition(e, compData);
		compStore.addComp(compData);
		compStore.setCurrComp(compData);
	}
};

const initPosition = (e, compData) => {
	/**
	 * 基于父级容器的x位置 e.offsetX
	 * y 位置 e.offsetY
	 */
	compData.props.base.attrs.axisX = {
		key: "axisX",
		name: "x坐标",
		type: "xui-input-number",
		value: e.offsetX,
	};
	compData.props.base.attrs.axisY = {
		key: "axisY",
		name: "y坐标",
		type: "xui-input-number",
		value: e.offsetY,
	};

	return compData;
};

/**
 * 容器组件内拖入事件
 */
const handleContainerDrop = async (e, compItem) => {
	if (compItem.type !== "ZyfContainer") return;
	if (e.dataTransfer) {
		const dropData = JSON.parse(e.dataTransfer.getData("comp-drag"));
		const propData = await handleProps(dropData);
		const compData = compTemplateData({
			...dropData,
			props: propData,
		});
		compStore.updateCompChildren(compItem.uuid, compData);
		compStore.setCurrComp(compData);

		// TODO: 组件内自由拖动
	}
};

/**
 * 移动事件
 */
const canvasRef = ref();
const handleMousedown = (e, item) => {
	handleSwitchComp(item);
	// canvas 左上边距
	const canvasOffsetX = canvasRef.value.getBoundingClientRect().left;
	const canvasOffsetY = canvasRef.value.getBoundingClientRect().top;

	// canvas 宽高
	const canvasWidth = canvasRef.value.getBoundingClientRect().width;
	const canvasHeight = canvasRef.value.getBoundingClientRect().height;

	// 当前组件的宽高
	const currtCompWidth = e.target.getBoundingClientRect().width;
	const currtCompHeight = e.target.getBoundingClientRect().height;

	// 鼠标在组件内偏移量
	const boxOffsetX = e.offsetX;
	const boxOffsetY = e.offsetY;
	// 计算偏移量
	const mousemove = throttle((moveEvent) => {
		console.log("3333333", moveEvent, canvasRef.value);

		const currtCompLeft = moveEvent.clientX - canvasOffsetX - boxOffsetX;
		const currtCompTop = moveEvent.clientY - canvasOffsetY - boxOffsetY;

		// 左上临界处理
		if (currtCompLeft < 0) return;
		if (currtCompTop < 0) return;

		// 右下临界处理
		if (currtCompLeft > canvasWidth - currtCompWidth) return;
		if (currtCompTop > canvasHeight - currtCompHeight) return;

		item.props.base.attrs.axisX.value = currtCompLeft;
		item.props.base.attrs.axisY.value = currtCompTop;
		compStore.updateCompProps(item);
	}, 30);

	const mouseup = () => {
		document.removeEventListener("mousemove", mousemove);
		document.removeEventListener("mouseup", mouseup);
	};

	document.addEventListener("mousemove", mousemove);
	document.addEventListener("mouseup", mouseup);
};

const handleSwitchComp = (compData) => {
	compStore.setCurrComp(compData);
};

/**
 * 修改组件box样式
 * 宽高位置
 */
const changeCompBoxStyle = (item) => {
	return {
		top: `${item.props.base.attrs.axisY.value}px`,
		left: `${item.props.base.attrs.axisX.value}px`,
	};
};

/**
 * 右击菜单事件
 */
let isContextMenu = ref(false);
let menuPosition = ref({});
const onContextMenu = (e) => {
	isContextMenu.value = true;
	menuPosition.value.left = `${e.clientX - 200}px`; // 左侧栏宽度200
	menuPosition.value.top = `${e.clientY}px`;

	let targetCompId = e.target.getAttribute("comp-uuid");
	if (!targetCompId) {
		// 循环找e.path
		for (let i = 0; i < e.path.length; i++) {
			const item = e.path[i];
			if (item.getAttribute("comp-uuid")) {
				targetCompId = item.getAttribute("comp-uuid");
				break;
			}
		}
	}
	compStore.setCurrCompById(targetCompId);
};
/**
 * 全局左击隐藏 右击菜单
 */
window.onclick = () => {
	isContextMenu.value = false;
};
</script>

<template>
	<div class="centerMain" @contextmenu.stop.prevent="onContextMenu">
		<div class="canvas" ref="canvasRef" @dragover.prevent @drop.stop.prevent="handleCompDrop">
			<!-- <span style="color: #fff">当前组件： {{ compStore.compsList }}</span> -->
			<CompBox
				v-for="compItem in compStore.compsList"
				:key="compItem.uuid"
				:item="compItem"
				:style="changeCompBoxStyle(compItem)"
				@mousedown.stop.prevent="handleMousedown($event, compItem)"
				@click.stop.prevent="handleSwitchComp(compItem)"
				@dragover.prevent
				@drop.stop.prevent="handleContainerDrop($event, compItem)"
			>
				<CompRender :compItem="compItem" />
			</CompBox>
		</div>

		<!-- <context-menu v-model="isContextMenu" :position="menuPosition" /> -->
	</div>
</template>

<style scoped lang="scss">
.centerMain {
	height: 100%;
	position: relative;
	overflow: hidden;
	background-image: linear-gradient(90deg, rgba(253, 253, 253, 0.2) 1%, rgba(255, 255, 255, 0) 5%),
		linear-gradient(rgba(255, 255, 255, 0.2) 1%, rgba(255, 255, 255, 0) 5%);
	background-size: 28px 28px;
	.canvas {
		height: 100%;
		position: relative;
	}
}
</style>
