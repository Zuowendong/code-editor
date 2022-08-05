<script setup>
import { reactive, ref } from "vue";
import { useCompStore } from "../store/modules/component";

/**
 * 拖入事件
 */
const compStore = useCompStore();
const compDrop = (e) => {
    if (e.dataTransfer) {
        const dropData = e.dataTransfer.getData("comp-drag");
        compStore.addComp(JSON.parse(dropData));
    }
};
</script>

<template>
    <div class="centerMain" @contextmenu.prevent="onContextMenu">
        <div class="canvas" @dragover.prevent @drop="compDrop">
            {{ compStore.compsList }}

            <div v-for="compItem in compStore.compsList" :key="compItem.uuid">
                <component :is="compItem.type"></component>
            </div>
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
}
</style>
