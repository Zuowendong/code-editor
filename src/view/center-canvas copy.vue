<script setup>
import { reactive, ref } from "vue";
import draggable from "vuedraggable";
import VueDragResize from "vue-drag-resize";

const components = reactive([
    { id: 1, name: "表单容器", style: { top: 100, left: 160 } },
    { id: 2, name: "输入框", style: { top: 300, left: 260 } },
    { id: 3, name: "下拉框", style: { top: 500, left: 60 } },
    { id: 4, name: "单选按钮组", style: { top: 600, left: 560 } },
    { id: 5, name: "复选按钮组", style: { top: 800, left: 460 } },
]);

let width = ref(0);
let height = ref(0);
let top = ref(0);
let left = ref(0);

const resize = (newRect) => {
    width.value = newRect.width;
    height.value = newRect.height;
    top.value = newRect.top;
    left.value = newRect.left;
};
</script>

<template>
    <div class="centerMain">
        <vue-drag-resize
            class="component-warp"
            :w="200"
            :h="40"
            v-on:resizing="resize"
            v-on:dragging="resize"
        >
            <input class="input" type="text" value="123" />
        </vue-drag-resize>
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
    border: 1px solid rgb(12, 36, 173);
}
.input {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
}
</style>
