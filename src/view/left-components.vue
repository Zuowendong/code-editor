<script setup>
import { ref, reactive } from "vue";
import draggable from "vuedraggable";
import { useComponentStore } from "../store/modules/component";

const components = reactive([
    { id: 1, name: "表单容器", style: { top: 100, left: 160 } },
    { id: 2, name: "输入框", style: { top: 300, left: 260 } },
    { id: 3, name: "下拉框", style: { top: 500, left: 60 } },
    { id: 4, name: "单选按钮组", style: { top: 600, left: 560 } },
    { id: 5, name: "复选按钮组", style: { top: 800, left: 460 } },
]);

const componentStore = useComponentStore();
const handleClone = (data) => {
    componentStore.setCurrentComponent(data);
    console.log("当前选中的组件", data);
};
</script>

<template>
    <div class="leftMain">
        <p class="title">components</p>

        <draggable
            v-model="components"
            group="people"
            item-key="id"
            :sort="false"
            @clone="handleClone"
        >
            <template #item="{ element }">
                <div class="component-warp">{{ element.name }}</div>
            </template>
        </draggable>
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
.component-warp {
    width: 100px;
    height: 50px;
    border: 1px solid #333;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-bottom: 10px;
    user-select: none;
}
</style>
