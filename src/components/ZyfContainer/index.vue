<script>
export default { name: "ZyfContainer" };
</script>

<script setup>
import { onMounted, ref, toRefs, watch } from "vue";

const props = defineProps({
    width: { type: Number, default: 300 },
    height: { type: Number, default: 50 },
    text: { type: String, default: "" },
    row: { type: Number, default: 2 },
    column: { type: Number, default: 2 },
});

let { width, height, text, row, column } = toRefs(props);

let columnStyle = ref(`repeat(${column.value}, 1fr)`);
watch(
    () => props.column,
    (val) => {
        columnStyle.value = `repeat(${val}, 1fr)`;
    }
);

let rowStyle = ref(`repeat(${row.value}, 1fr)`);
watch(
    () => props.row,
    (val) => {
        rowStyle.value = `repeat(${val}, 1fr)`;
    }
);
</script>

<template>
    <div class="containerMain">
        <!-- 这是一个 {{ text }} 组件{{ width }} * {{ height }} -->
        <div class="layout"></div>
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
.layout {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: v-bind(columnStyle);
    grid-template-rows: v-bind(rowStyle);
}
</style>
