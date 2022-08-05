<script>
export default { name: "ZyfContainer" };
</script>

<script setup>
import { onMounted, ref, toRefs, watch } from "vue";

const props = defineProps({
    width: {
        type: Number,
        default: 150,
    },
    height: {
        type: Number,
        default: 50,
    },
});

let { width, height } = toRefs(props);

// console.log(123123, aaa.value);
</script>

<template>
    <div class="containerMain">这是一个容器组件{{ width }} * {{ height }}</div>
</template>

<style scoped>
.containerMain {
    width: 550px;
    height: 250px;
    border: 1px solid #333;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
}
</style>
