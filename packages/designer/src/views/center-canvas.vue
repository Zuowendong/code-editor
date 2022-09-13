<script setup>
import { ref, getCurrentInstance } from "vue";
import { throttle, cloneDeep } from "lodash-es";

import { useCompStore } from "../store/component";
import { compTemplateData } from "../utils/compTemplateData";
import { formatStyle, formatProps } from "../utils/formatComp";

import CompBox from "./comp-box.vue";

/**
 * 属性处理
 */
const internalInstance = getCurrentInstance();
const handleProps = async (item) => {
	let compPropMap = {};
	const compProps = internalInstance.appContext.components[item.type].customProps;
	console.log("center-canvas.vue", compProps);

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
		const compData = compTemplateData(compDataModle);

		const startX = e.clientX - 204;
		const startY = e.clientY;

		compData.props.base.attrs.axisX = {
			key: "axisX",
			name: "x坐标",
			type: "xui-input-number",
			value: startX,
		};
		compData.props.base.attrs.axisY = {
			key: "axisY",
			name: "y坐标",
			type: "xui-input-number",
			value: startY,
		};

		compStore.addComp(compData);
		compStore.setCurrComp(compData);
	}
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
const handleMousedown = (e, item) => {
	handleSwitchComp(item);
	// 记录点击初始位置
	const startX = e.clientX;
	const startY = e.clientY;

	// 鼠标在组件内偏移量
	const boxOffsetX = e.offsetX;
	const boxOffsetY = e.offsetY;
	// 计算偏移量
	const mousemove = throttle((moveEvent) => {
		const currtCompLeft = moveEvent.clientX - 204 - boxOffsetX;
		const currtCompTop = moveEvent.clientY - boxOffsetY;
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
	menuPosition.value.left = `${e.clientX - 204}px`; // 左侧栏宽度200， gap:4
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
		<div class="canvas" @dragover.prevent @drop.stop.prevent="handleCompDrop">
			<!-- 当前组件： {{ compStore.compsList }} -->
			<CompBox
				v-for="compItem in compStore.compsList"
				:key="compItem.uuid"
				:item="compItem"
				class="compBox"
				:style="changeCompBoxStyle(compItem)"
				@mousedown.stop.prevent="handleMousedown($event, compItem)"
				@click.stop.prevent="handleSwitchComp(compItem)"
				@dragover.prevent
				@drop.stop.prevent="handleContainerDrop($event, compItem)"
			>
				<component
					:is="compItem.type"
					:comp-uuid="compItem.uuid"
					:comp-type="compItem.type"
					v-bind="{ ...formatProps(compItem.props) }"
				>
					<template v-if="compItem.children">
						<component
							v-for="childItem in compItem.children"
							:key="childItem.uuid"
							:is="childItem.type"
							:comp-uuid="childItem.uuid"
							:comp-type="childItem.type"
							v-bind="{ ...formatProps(childItem.props) }"
							@click.stop.prevent="handleSwitchComp(childItem)"
						></component>
					</template>
				</component>
			</CompBox>
		</div>

		<!-- <context-menu v-model="isContextMenu" :position="menuPosition" /> -->
	</div>
</template>

<style scoped>
.centerMain {
	position: relative;
	background-color: #fff;
	overflow: hidden;
	background-image: linear-gradient(90deg, rgba(73, 69, 69, 0.2) 1%, rgba(0, 0, 0, 0) 5%),
		linear-gradient(rgba(73, 69, 69, 0.2) 1%, rgba(0, 0, 0, 0) 5%);
	background-size: 28px 28px;
}
.canvas {
	width: 100%;
	height: 100%;
	position: relative;
}
.compBox {
	position: absolute;
	border: 1px solid transparent;
}
</style>
