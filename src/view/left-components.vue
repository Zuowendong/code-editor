<script setup>
import { ref, reactive } from "vue";
let components = reactive([
    { id: 1, name: "容器", type: "ZyfContainer" },
    { id: 2, name: "输入框", type: "input" },
    { id: 3, name: "下拉框", type: "select" },
    { id: 4, name: "单选按钮组", type: "radio" },
    { id: 5, name: "复选按钮组", type: "checkbox" },
]);

/**
 * 开始拖拽
 */
const handleDragStart = (e, item) => {
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

<template>
    <div class="leftMain">
        <p class="title">components</p>

        <div
            class="compBox"
            v-for="item in components"
            :key="item.id"
            draggable="true"
            @dragstart="handleDragStart($event, item)"
        >
            {{ item.name }}
        </div>
    </div>
</template>

<style scoped>
.leftMain {
    background-color: #fff;
    padding-left: 10px;
    box-sizing: border-box;
}
.title {
    margin: 10px 0;
    padding-bottom: 6px;
    border-bottom: 1px solid #ddd;
}
.compBox {
    width: 100px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #333;
    user-select: none;
    cursor: pointer;
}
</style>
