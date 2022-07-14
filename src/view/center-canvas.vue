<script setup></script>

<template>
    <div class="centerMain">
        <p>canvas</p>
        <vue3ResizeDrag :x="260" :y="90" :w="1200" :h="600" :zIndex="1">
            测试1
        </vue3ResizeDrag>
        <vue3ResizeDrag :x="260" :y="90" :w="300" :h="32" :zIndex="1">
            <input style="padding: 10px" type="text" value="123">
        </vue3ResizeDrag>
    </div>
</template>

<style scoped>
.centerMain {
    background-color: #fff;
    overflow: hidden;
}
</style>
