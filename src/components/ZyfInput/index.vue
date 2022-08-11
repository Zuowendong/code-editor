<script>
export default { name: "ZyfInput" };
</script>

<script setup>
import { onMounted, ref, toRefs, watch } from "vue";

const props = defineProps({
    width: { type: String, default: "100" },
    height: { type: String, default: "30" },
    value: { type: String, default: "" },
    placeholder: { type: String, default: "" },
});

let { width, height, value, placeholder } = toRefs(props);
</script>

<template>
    <div class="inputMain">
        <el-input v-model="value" :placeholder="placeholder" />
    </div>
</template>

<style scoped>
.textMain {
    width: v-bind(width);
    height: v-bind(height);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
</style>
