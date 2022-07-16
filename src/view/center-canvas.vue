<script setup>
import { reactive, ref } from "vue";
import draggable from "vuedraggable";
import VueDragResize from "vue-drag-resize";
import { useComponentStore } from "../store/modules/component";
import { useDragGroupStore } from "../store/modules/dragGroup";

let componentActive = ref(false);
/**
 * 右击菜单
 * 根据事件对象中鼠标点击的位置，进行定位
 */
let menuVisible = ref(false);
let menuPosition = ref({});
const onContextMenu = (e) => {
    componentActive.value = true;
    menuVisible.value = true;
    menuPosition.value.left = `${e.clientX - 204}px`; // 左侧栏宽度200， gap:4
    menuPosition.value.top = `${e.clientY}px`;
};
/**
 * 全局左击
 */
window.onclick = (e) => {
    menuVisible.value = false;
};

let components = reactive([]);

const dragGroupStore = useDragGroupStore();
let GROUPNAME = dragGroupStore.dragGroupName;

const handleChoose = () => {
    console.log("123123");
};

const handleChange = (newRect, element) => {
    element.resize(newRect);
};
</script>

<template>
    <div class="centerMain" @contextmenu.prevent="onContextMenu">
        {{ components }}
        <draggable
            :active="componentActive"
            :list="components"
            :group="{ name: GROUPNAME }"
            tag="transition-group"
            :item-key="id"
            @choose="handleChoose"
        >
            <template #item="{ element }">
                <vue-drag-resize
                    class="component-warp"
                    :isActive="true"
                    :w="element.width"
                    :h="element.height"
                    :x="element.top"
                    :y="element.left"
                    v-on:resizing="(e) => handleChange(e, element)"
                    v-on:dragging="(e) => handleChange(e, element)"
                >
                    <input class="input" type="text" :value="element.name" />
                    <div>宽高：{{ element.width }} * {{ element.height }}</div>
                    <div>位置：{{ element.top }} * {{ element.left }}</div>
                </vue-drag-resize>
            </template>
        </draggable>

        <context-menu v-model="menuVisible" :position="menuPosition" />
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
.component-warp {
    border: 1px solid #333;
}
.input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
}

.menu {
    position: absolute;
}
</style>
