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
    text: {
        type: String,
        default: "容器",
    },
});

let { width, height, text } = toRefs(props);

defineExpose(props);
</script>

<template>
    <div class="containerMain">
        这是一个{{ text }}组件{{ width }} * {{ height }}
    </div>
</template>

<style scoped>
.containerMain {
    width: 150px;
    height: 50px;
    border: 1px solid #333;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
</style>
