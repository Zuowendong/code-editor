<script setup>
import { computed, reactive, ref } from "vue";
import { throttle } from "lodash-es";

import { useCompStore } from "../store/modules/component";
import { compTemplateData } from "../utils/compTemplateData";
import { formatStyle, formatProps } from "../utils/formatComp";
import { getCompPorps } from "../editor-comp/index";

import CompBox from "./components/CompBox.vue";

const handleProps = async (item) => {
    const compProps = await getCompPorps(item);
    let compPropMap = {};
    compProps.properties.forEach((el) => {
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
        const compData = compTemplateData({
            ...dropData,
            props: propData,
        });
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
        item.props.base.attrs.axisX.value = currtCompLeft;
        item.props.base.attrs.axisY.value = currtCompTop;
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
        top: `${item.props.base.attrs.axisY.value}px`,
        left: `${item.props.base.attrs.axisX.value}px`,
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
            当前组件： {{ formatProps(compStore.currentComp.props) }}
            <comp-box
                v-for="compItem in compStore.compsList"
                :key="compItem.uuid"
                :item="compItem"
                class="compBox"
                :style="changeCompBoxStyle(compItem)"
                @mousedown.stop.prevent="handleMousedown($event, compItem)"
                @click="handleSwitchComp(compItem)"
            >
                <component
                    :is="compItem.type"
                    v-bind="{ ...formatProps(compItem.props) }"
                ></component>
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
