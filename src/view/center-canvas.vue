<script setup>
import { computed, reactive, ref } from "vue";
import { throttle } from "lodash-es";

import { useCompStore } from "../store/modules/component";
import { compTemplateData } from "../utils/compTemplateData";

import CompBox from "./components/CompBox.vue";

/**
 * 拖入事件
 */
const compStore = useCompStore();

const handleCompDrop = (e) => {
    if (e.dataTransfer) {
        const dropData = JSON.parse(e.dataTransfer.getData("comp-drag"));
        const compData = compTemplateData(dropData);
        compStore.addComp(compData);
        compStore.setCurrComp(compData);
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
        item.props = {
            left: currtCompLeft,
            top: currtCompTop,
        };
        compStore.updateComp(item);
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
        top: `${item.props.top}px`,
        left: `${item.props.left}px`,
    };
};
</script>

<template>
    <div class="centerMain" @contextmenu.prevent="onContextMenu">
        <div
            class="canvas"
            @dragover.prevent
            @drop.stop.prevent="handleCompDrop"
        >
            {{ compStore.currentComp.uuid }}
            <comp-box
                v-for="compItem in compStore.compsList"
                :key="compItem.uuid"
                :item="compItem"
                class="compBox"
                :style="changeCompBoxStyle(compItem)"
                @mousedown.stop.prevent="handleMousedown($event, compItem)"
                @click="handleSwitchComp(compItem)"
            >
                <component :is="compItem.type"></component>
            </comp-box>
        </div>
    </div>
</template>

<style scoped>
.centerMain {
    position: relative;
    background-color: #fff;
    overflow: hidden;
    background-image: linear-gradient(
            90deg,
            rgba(73, 69, 69, 0.2) 1%,
            rgba(0, 0, 0, 0) 5%
        ),
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
