<script setup>
import { ref, reactive } from "vue";
const components = reactive([
    { name: "表单容器" },
    { name: "输入框" },
    { name: "下拉框" },
    { name: "单选按钮组" },
    { name: "复选按钮组" },
]);
</script>

<template>
    <div class="leftMain">
        <p class="title">components</p>
        <div
            class="component-warp"
            v-for="(item, index) in components"
            :key="index"
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
