<script>
export default { name: "ZyfContainer" };
</script>

<script setup></script>

<template>
    <div class="containerMain">这是一个容器组件</div>
</template>

<style scoped>
.containerMain {
    width: 150px;
    height: 50px;
    border: 1px solid #333;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
}
</style>
