<script>
export default { name: "ZyfContainer" };
</script>

<script setup>
import { onMounted, ref, toRefs, watch } from "vue";

const props = defineProps({
    width: { type: String, default: "" },
    height: { type: String, default: "" },
    text: { type: String, default: "" },
});

let { width, height, text } = toRefs(props);

defineExpose(props);
</script>

<template>
    <div class="containerMain">
        这是一个 {{ text }} 组件{{ width }} * {{ height }}
    </div>
</template>

<style scoped>
.containerMain {
    width: v-bind(width);
    height: v-bind(height);
    border: 1px solid #333;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
</style>
